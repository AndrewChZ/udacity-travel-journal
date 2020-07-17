const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

app.use(express.static('dist'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

// Dummy API Endpoint
const fakeData = {
    animal: 'lion',
    fact: 'lions are fun'
}

app.get('/fakeAnimalData', getFakeData)

function getFakeData(req, res) {
res.send(fakeData)
}



