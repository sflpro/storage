const express = require('express');

const storageRouter = require('./routes/storage');

const app = express();

/**
 * Main application routes.
 */
app.use('/', storageRouter);

module.exports = app;
