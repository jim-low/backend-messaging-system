const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
  const token = req.headers['authorization']
  if (token == null) {
    return res.status(401).send({ error: "Unauthorized user" })
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).send({ error: "Error authenticating user" })
    }
    req.user = user
    next()
  })
}

exports.authenticate = authenticate
