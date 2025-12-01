const bcrypt = require('bcrypt')
const User = require('../models/user').model

exports.list_get = (req, res) => {
  const { type } = req.query

  let query = {}

  if (type) {
    query.type = type
  }

  User.find(query)
    .select('-password')
    .lean()
    .then(doc => {
      return res.send(doc)
    })
    .catch(err => {
      console.error({ err })
      return res.status(500).send({ err })
    })
}

exports.details_get = (req, res) => {
  const { userid } = req.params

  let query = {
    _id: userid
  }

  User.findOne(query)
    .select('-password')
    .lean()
    .then(doc => {
      return res.send(doc)
    })
    .catch(err => {
      console.error({ err })
      return res.status(500).send({ err })
    })
}

exports.create_post = (req, res) => {
  const { name, email, password, type } = req.body

  const saltRounds = 10
  bcrypt
    .hash(password, saltRounds)
    .then(hashedPassword => {
      let newUser = new User({
        name,
        email,
        password: hashedPassword,
        type
      })

      return newUser.save()
    })
    .then(doc => {
      const obj = doc.toObject()
      delete obj.password
      return res.send(obj)
    })
    .catch(err => {
      console.error({ err })

      // Handle duplicate key errors (e.g. duplicate email)
      // MongoDB duplicate error code is 11000
      if (
        err &&
        (err.code === 11000 ||
          err.code === '11000' ||
          err.codeName === 'DuplicateKey')
      ) {
        const key = (err.keyValue && Object.keys(err.keyValue)[0]) || 'email'
        return res
          .status(400)
          .send({ status: false, message: `${key} already in use` })
      }

      return res.status(500).send({ err })
    })
}

exports.delete_delete = async (req, res) => {
  const { userid } = req.params

  let query = {
    _id: userid
  }

  User.deleteOne(query)
    .then(doc => {
      return res.send(doc)
    })
    .catch(err => {
      console.error({ err })
      return res.status(500).send({ err })
    })
}
