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
`)
        // geoNamesLat = data.geonames[0].lat;
        // geoNamesLong = data.geonames[0].lng;
    });

}

function getCountry() {
    let x = document.getElementById("country-field").value
}

export { performAction, getCountry }