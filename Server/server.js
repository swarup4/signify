require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

const controller = require('./modules');

const app = express();
const port = process.env.PORT;

mongoose.connect('mongodb://localhost/signify').then(() => {
    console.log("Database has Connected");
}).catch(err => {
    console.log("Error : " + err);
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', controller);

app.listen(port, () => {
    console.log("Server is Running in ", port);
});

module.exports = app;