const express = require('express');
const router = express.Router();
const Users = require('../model/user');

router.get('/', (req, res) => {
  Users.find({}, (err, data) => {
    if (err) return res.send({ error: 'Erro na consulta de usuários!' });
    return res.send(data);
  });
});

router.post('/create', (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) return res.send({ error: 'Dados insuficientes!' });

  Users.findOne({ email}, (err, data) => {
    if (err) return res.send({ error: 'Erro ao buscar usuário!' });
    if (data) return res.send({ error: 'Usuário já registrado!' });

    Users.create(req.body, (err, data) => {
      if (err) return res.send({ error: 'Erro ao criar usuário!' });

      data.password = undefined;
      return res.send(data);
    });
  });
});

module.exports = router;
