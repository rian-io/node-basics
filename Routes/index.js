const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/',  auth, (req, res) => {
  console.log(res.locals.auth_data);
  return res.send({message: 'Essa informação é muito importante. Usuários não autorizados não deveriam recebê-la!'});
});

router.post('/', (req, res) => {
  return res.send({message: 'Tudo OK com o método POST da raiz'});
});

module.exports = router;
