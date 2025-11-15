const Joi = require('joi')

// Define password validation rules
// Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special char
const passwordSchema = Joi.string()
  .min(8)
  .pattern(/[A-Z]/) // At least one uppercase
  .pattern(/[a-z]/) // At least one lowercase
  .pattern(/[0-9]/) // At least one digit
  .pattern(/[!@#$%^&*]/) // At least one special character
  .required()
  .messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.pattern.base':
      'Password must contain uppercase, lowercase, digit, and special character (!@#$%^&*)',
    'any.required': 'Password is required'
  })

// Login validation schema
exports.loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required'
  }),
  type: Joi.string().required().messages({
    'any.required': 'Type is required'
  })
})

// User creation validation schema
exports.createUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name must not exceed 100 characters',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required'
  }),
  password: passwordSchema,
  type: Joi.string().required().messages({
    'any.required': 'Type is required'
  }),
  phone: Joi.string().optional()
})

// Validation middleware
exports.validate = schema => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    })

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
      return res.status(400).send({
        status: false,
        message: 'Validation failed',
        errors
      })
    }

    req.body = value
    next()
  }
}
