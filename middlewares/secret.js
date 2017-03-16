const jwt = require('koa-jwt')
const jwtSecret = require('../config/jwtSecret')

module.exports = jwt({
  secret: jwtSecret
})