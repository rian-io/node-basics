const express = require('express');
const app = express();

app.get('/', (req, res) => {
  let obj = req.query;

  return res.send({message: `Tudo OK com o método GET! Você enviou o nome ${obj.nome} com idade de ${obj.idade} anos`});
});

app.post('/', (req, res) => {
  return res.send({message: 'Tudo OK com o método POST'});
});

app.listen(3000);

module.exports = app;