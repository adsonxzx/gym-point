const express = require('express')

const routes = new express.Router()

routes.get('/', (req, res) => {
  res.json({ok: 'ok'})
})

module.exports = routes