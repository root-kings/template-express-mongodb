const router = require('express').Router()

const validateToken = require('../middlewares/validateToken')
const { validate, createUserSchema } = require('../utils/validators')

const userController = require('../controllers/user')

// Controllers -----

router.get('/:userid', validateToken, userController.details_get)

router.get('/', validateToken, userController.list_get)

router.post('/', validate(createUserSchema), userController.create_post)

router.delete('/:userid', validateToken, userController.delete_delete)

router.get('/', (req, res) => {
  res.send('Please read documentation for the API. (user)')
})

// Export -----
module.exports = router
