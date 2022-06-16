const express = require('express');
const app = express();

const review = require('./reviews/controller');

app.use('/', review);

module.exports = app;