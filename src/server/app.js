//app.js
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: 'dist' })
})

module.exports = app;