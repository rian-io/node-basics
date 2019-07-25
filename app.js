const express = require('express');
const app = express();

const indexRoute = require ('./Routes/index');
const usersRoute = require ('./Routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000);

module.exports = app;