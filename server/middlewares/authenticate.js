const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
  const token = req.headers['authorization']
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

exports.authenticate = authenticate
