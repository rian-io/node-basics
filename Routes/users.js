const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// FUNÇÕES AUXILIARES
const createUserToken = (userId) => {
  return jwt.sign({ id: userId }, 'batatafrita2019', { expiresIn: '7d' });
}

router.get('/', async (req, res) => {
  try {
    const users = await Users.find({});
    return res.send(users);
  }
  catch (err) {
    return res.status(500).send({ error: 'Erro na consulta de usuários!' });
  }
});

router.post('/create', async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) return res.status(400).send({ error: 'Dados insuficientes!' });

  try {
    if (await Users.findOne({ email })) return res.status(400).send({ error: 'Usuário já registrado!' });

    const user = await Users.create(req.body);
    user.password = undefined;
    return res.status(201).send({ user, token: createUserToken(user.id) });
  } catch (err) {
    return res.status(500).send({ error: 'Erro ao buscar usuário!' });
  }
});

router.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) return res.status(400).send({ error: 'Dados insuficientes!' });

  try {
    const user = await Users.findOne({ email }).select('+password');
    if (!user) return res.status(400).send({ error: 'Usuário não registrado!' });

    const pass_ok = await bcrypt.compare(password, user.password);
    if (!pass_ok) return res.status(401).send({ error: 'Erro ao autenticar usuário!' });

    user.password = undefined;
    return res.send({ user, token: createUserToken(user.id) });
  } catch (err) {
    return res.status(500).send({ error: 'Erro ao buscar usuário!' });
  }
});

module.exports = router;
