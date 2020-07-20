document.getElementById("fetch-button").addEventListener('click', performAction);


// Original PerformAction function that took returned test data
function performAction(event) {
    event.preventDefault()

    let geoNamesLocation = document.getElementById("country-field").value;
    let geoNamesLat;
    let geoNamesLong;

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

    getData('http://localhost:8080/travel', {city: geoNamesLocation})
    .then(data => {
        console.log(`
        You're going to: ${geoNamesLocation},
        Lat: ${data.lat},
        Long: ${data.long}
        Temperature: ${data.temperature},
        Image: ${data.image}
        `);
        createFragment(data);
    });

    
}

function createFragment(data) {

    let fragment = document.createDocumentFragment();
    fragment = `
<div id="result-image">
    <div id="results-and-button">
        <div id="result-card">
            <h1>${data.city}</h1>
            <div id="stats-primary">
                <div class="stat"><img class="stats-icon" src="../client/img/icn_flight-depart-black.png"> Trip starts in <b>24</b> days</div>
                <div class="stat-divider">·</div>
                <div class="stat"><img class="stats-icon" src="../client/img/icn_weather-black.png"> Weather temperature is <b>${data.temperature}</b></div>
            </div>
            <div id="stats-secondary">
                <div>
                    <p class="subtitle">Departure date</p>
                    <p>29 Sep 2019</p>
                </div>
                <div>
                    <p class="subtitle">Arrival date</p>
                    <p>29 Sep 2019</p>
                </div>
                <div>
                    <p class="subtitle">Length of trip</p>
                    <p>29 Sep 2019</p>
                </div>
            </div>
        </div>
        <input type="submit" id="check-button" value="Check another trip">
    </div>
</div>`;
    // console.log(fragment);
    document.querySelector('body').innerHTML = fragment;

    console.log("Changing background image");
    document.getElementById("result-image").style.backgroundImage = `url(${data.image})`;
    console.log(document.getElementById("result-image").style.backgroundImage);
    console.log("Changed");
}

function getCountry() {
    let x = document.getElementById("country-field").value
}

export { performAction, getCountry }