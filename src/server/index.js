const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require("body-parser");
const fetch = require("node-fetch")

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


// -----------
// IF USING REAL END POINTS
app.post('/GeoNamesLatLong', async (req, res) => {

    // console.log(req);
    console.log(`Printing req.body: ${req.body.city}`);


    const response = await fetch(`http://api.geonames.org/searchJSON?q=${req.body.city}&maxRows=10&username=${process.env.USERNAME_GEONAMES}`);
    try {
        const data = await response.json();
        console.log(`Lat: ${data.geonames[0].lat}, Long: ${data.geonames[0].lng}`)
        res.send(data)
    } catch(error) {
        console.log("error", error)
    }
})
