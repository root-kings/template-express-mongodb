const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user').model

exports.login_post = async (req, res) => {
  const { email, password, type } = req.body

  try {
    const user = await User.findOne({ email, type }).lean()

    if (!user) {
      return res.status(401).send({ status: false })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).send({ status: false })
    }

    const safeUser = Object.assign({}, user)
    delete safeUser.password

    const payload = { user: safeUser }
    const options = {
      expiresIn: process.env.JWT_EXPIRES,
      issuer: process.env.JWT_ISSUER
    }
    const secret = process.env.JWT_SECRET
    const token = jwt.sign(payload, secret, options)

    return res.send({
      status: true,
      token,
      user: safeUser
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ err })
  }
}

exports.login_status_get = (req, res) => {
  res.send({ success: true })
}
