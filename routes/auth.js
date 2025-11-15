const router = require('express').Router()

const validateToken = require('../middlewares/validateToken')
const { validate, loginSchema } = require('../utils/validators')

const authController = require('../controllers/auth')

// Controllers -----

router.get('/login/status', validateToken, authController.login_status_get)

router.post('/login', validate(loginSchema), authController.login_post)

router.get('/', (req, res) => {
  res.send('Please read documentation for the API. (auth)')
})

// Export -----
module.exports = router
