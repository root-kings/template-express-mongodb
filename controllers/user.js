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
  // Validation is handled by middleware, req.body is already validated
  const { name, email, password, type, phone } = req.body

  const saltRounds = 10
  bcrypt
    .hash(password, saltRounds)
    .then(hashedPassword => {
      let newUser = new User({
        name,
        email,
        password: hashedPassword,
        type,
        phone
      })

      return newUser.save()
    })
    .then(doc => {
      // Do not send password back
      const obj = doc.toObject()
      delete obj.password
      return res.send(obj)
    })
    .catch(err => {
      console.error({ err })
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
