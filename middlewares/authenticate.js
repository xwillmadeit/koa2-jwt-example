const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/jwtSecret')

module.exports = async (ctx, next) => {
  const { username, password } = ctx.request.body

  if (password === 'password') {
    ctx.status = 200
    ctx.authenticateData = {
      token: jwt.sign({ username: username }, jwtSecret), 
      message: "Successfully logged in!"
    }
  } else {
    ctx.status = 401
    ctx.authenticateData = {
      message: "Authentication failed..."
    }
  }

  await next()
}