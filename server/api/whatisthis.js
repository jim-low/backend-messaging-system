function whatisthis(req, res) {
  res.status(418).send({ whatisthis: { message: "(੭｡╹▿╹｡)੭ its a kirby!!!" } })
}

exports.whatisthis = whatisthis
