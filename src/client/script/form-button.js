// Adds event listener to the main btuton
document.getElementById("fetch-button").addEventListener('click', performAction);
import { getCountry } from './getCountry';


function performAction(event) {
    event.preventDefault()

    // Fetches the user inputter country, departure and arrival date
    let geoNamesLocation = document.getElementById("country-field").value;

    // Format the user inputter start date to a Javascript date object
    let startDate = new Date(document.getElementById("startDate").value);
    let startDateFormatted = startDate.toLocaleString("en-GB", {
        day: "numeric", month: "short", year: "numeric"
    });
    console.log(`You're flying off at ${startDateFormatted}`);

    // Format the user inputter end date to a Javascript date object
    let endDate = new Date(document.getElementById("endDate").value);
    let endDateFormatted = endDate.toLocaleString("en-GB", {
        day: "numeric", month: "short", year: "numeric"
    });
    console.log(`And coming back at ${endDateFormatted}`);

    // Calculate length of trip
    let lengthOfTrip = (endDate.getTime() - startDate.getTime())/(1000*3600*24);
    console.log(`You'll be away for ${lengthOfTrip} days`)
    let todaysDate = new Date();

    // Calculate days till the trip starts
    let daysTillTripStart = Math.floor((endDate.getTime() - todaysDate.getTime())/(1000*3600*24));
    console.log(`Trip starts in ${daysTillTripStart} day`);


    // Settings for the main async function
    async function getData(url="", data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify(data)
        });
        return response.json();
    }

    // Calls the main "get" method to retrive lat long, image, temperature
    getData('http://localhost:8080/travel', {city: geoNamesLocation})
    .then(data => {
        console.log(`
        You're going to: ${geoNamesLocation},
        Lat: ${data.lat},
        Long: ${data.long}
        Temperature: ${data.temperature},
        Image: ${data.image}
        `);
        displayReturnedInfo(data, startDateFormatted, endDateFormatted, lengthOfTrip, daysTillTripStart);
        document.getElementById("check-button").addEventListener('click', displaySearchInput);
    });   
}

// Function to display the search input when user wants to search a new term
function displaySearchInput() {
    let bgImage;

    async function getData(url="", data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify(data)
        });
        return response.json();
    }

    // Calls for a newrandomised background image
    getData('http://localhost:8080/bg-image')
    .then(data => {
        console.log(`
        Image: ${data.image}
        `);
        console.log("Changing background image");
        // BUG, FIX ME: to add in shadows to the BG-image by adding in "linear-gradient(0deg, rgba(24, 35, 35, 0.5), rgba(24, 35, 35, 0.5)),"
        document.getElementById("bg-image").style.backgroundImage = `url(${data.image}`;
        console.log(document.getElementById("bg-image").style.backgroundImage);
        console.log("Changed");
    });

    // Creates the fragment to hold frontpage HTML
    let fragment = document.createDocumentFragment();
    fragment=`
<!-- LANDING PAGE -->
<div id="bg-image">
    <div id="search-input">
        <h2>Where’s your next adventure?</h2>
        <form>
            <div id="form-country">
                <img src="../client/img/icn_location.png" class="searchIcon">
                <input type="text" placeholder="Country" id="country-field"></input>
            </div>
            <!-- <div class="search-divider"></div> -->
            <div id="form-depart">
                <img src="../client/img/icn_flight-depart.png" class="searchIcon">
                <input type="date" id="startDate" placeholder="From"></input>
            </div>
            <!-- <div class="search-divider"></div> -->
            <div id="form-arrive">
                <img src="../client/img/icn_flight-arrive.png" class="searchIcon">
                <input type="date" id="endDate" placeholder="To"></input>
            </div>
            <div id="form-button">
                <input type="submit" id="fetch-button" value="Enter">
            </div>
        </form>
    </div>
</div>
    `
    // Starts the process to change body content to search landing page
    console.log('Changing back to search page')
    document.querySelector('body').innerHTML = fragment;
    document.getElementById("fetch-button").addEventListener('click', performAction); // Adding in click event listener to the button
    console.log('Finished changing back to search page')
}

// Function to display the results page
function displayReturnedInfo(data, startDate, endDate, lengthOfTrip, daysTillTripStart) {

    // Fragment to hold the results page HTML for the body
    let fragment = document.createDocumentFragment();
    fragment = `
<!-- RESULTS PAGE -->
<div id="result-image">
    <div id="results-and-button">
        <div id="result-card">
            <h1>${data.city}</h1>
            <div id="stats-primary">
                <div class="stat"><img class="stats-icon" src="../client/img/icn_flight-depart-black.png"> Trip starts in <b>${daysTillTripStart}</b> days</div>
                <div class="stat-divider">·</div>
                <div class="stat"><img class="stats-icon" src="../client/img/icn_weather-black.png"> Weather temperature is <b>${data.temperature}</b></div>
            </div>
            <div id="stats-secondary">
                <div>
                    <p class="subtitle">Departure date</p>
                    <p>${startDate}</p>
                </div>
                <div>
                    <p class="subtitle">Arrival date</p>
                    <p>${endDate}</p>
                </div>
                <div>
                    <p class="subtitle">Length of trip</p>
                    <p>${lengthOfTrip} days</p>
                </div>
            </div>
        </div>
        <input type="submit" id="check-button" value="Check another trip">
    </div>
</div>`;
    document.querySelector('body').innerHTML = fragment;

    // Changes the background image based on the city user has inputted
    console.log("Changing background image");
    document.getElementById("result-image").style.backgroundImage = `url(${data.image})`;
    console.log(document.getElementById("result-image").style.backgroundImage);
    console.log("Changed");
}

export { performAction, getCountry, displaySearchInput }