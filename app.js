const express = require('express');
const storageRouter = require('./routes/storageRoutes');
const app = express();


app.use(storageRouter);

module.exports = app;
