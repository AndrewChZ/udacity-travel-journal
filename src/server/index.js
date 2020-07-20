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

// Overall request
app.post("/travel", async (req, res) => {

    const geonamesResult = await getGeonames(req.body.city)
    console.log(`---------------------------------`);
    console.log(`---------------------------------`);
    console.log(`Printing from overall /travel request`);
    console.log(`-----------------`);
    console.log(`The co-ordinates are:`);
    console.log(`Lat: ${geonamesResult.geonames[0].lat}, Long: ${geonamesResult.geonames[0].lng},`);

//     console.log(`
// .....fetching data for https://api.weatherbit.io/v2.0/current?lat=${geonamesResult.geonames[0].lat}&lon=${geonamesResult.geonames[0].lng}&key=${process.env.APP_ID_WEATHERBIT}
// `) 

    const weatherbitResult = await getWeatherbit(geonamesResult.geonames[0].lat, geonamesResult.geonames[0].lng)

    console.log(`-----------------`);
    console.log(`The weather is:`);
    console.log(weatherbitResult.data[0].temp);
    console.log(`-----------------`);

    const pixabayResult = await getPixabay(req.body.city);

    console.log(`Here's an image:`);
    console.log(pixabayResult.hits[0].largeImageURL);
    console.log(`---------------------------------`);
    console.log(`---------------------------------`);

    let results = {
        lat: geonamesResult.geonames[0].lat,
        long: geonamesResult.geonames[0].lng,
        temperature: weatherbitResult.data[0].temp,
        image: pixabayResult.hits[0].largeImageURL,
    }
    
    res.send(results);
})

// GET request - geonames
const getGeonames = async(city) => {
    const urlGeonames = `http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=${process.env.USERNAME_GEONAMES}`;

    try {
        const response = await fetch(urlGeonames);
        const data = await response.json();
        // console.log(`---------------------------------`);
        // console.log(`Printing from geoNames GET request`);
        // console.log(`Lat: ${data.geonames[0].lat}, Long: ${data.geonames[0].lng}`)
        // console.log(`---------------------------------`);
        return data;
    } catch(error) {
        console.log("error", error)
    }
};

// GET request - Weatherbit
const getWeatherbit = async(lat, long) => {
    const urlWeatherbit = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${process.env.APP_ID_WEATHERBIT}`;

    try {
        const response = await fetch(urlWeatherbit);
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("error", error)
    }
};

// GET request - Pixabay
const getPixabay = async(city) => {
    const urlPixabay = `https://pixabay.com/api/?key=${process.env.API_KEY_PIXABAY}&q=${city}&image_type=photo`;

    try {
        const response = await fetch(urlPixabay);
        const data = await response.json();
        // console.log(data.hits[0].largeImageURL);
        return data;
    } catch(error) {
        console.log("error", error)
    }
};

// https://pixabay.com/api/?key=17365757-742febfda330db7b37eefb539&q=bangkok&image_type=photo


// Step 1. Getting GeoNames API
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

// Step 2. Getting Weatherbit URL
// https://api.weatherbit.io/v2.0/current?lat=13.75398&lon=100.50144&key=ea0b6d4703b9426b89e488fb08a49a9e

app.post('/GetWeatherData', async (req, res) => {

    // console.log(req);
    console.log(`Lat: ${req.body.lat}, Long: ${req.body.long}`);


    const response = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${req.body.lat}&lon=${req.body.long}&key=${process.env.APP_ID_WEATHERBIT}`);
    try {
        const data = await response.json();
        console.log(`Lat: ${data.geonames[0].lat}, Long: ${data.geonames[0].lng}`)
        res.send(data)
    } catch(error) {
        console.log("error", error)
    }
})


