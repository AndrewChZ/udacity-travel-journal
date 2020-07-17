document.getElementById("check-button").addEventListener('click', performAction);


// Original PerformAction function that took returned test data
// function performAction() {
//     event.preventDefault()
//     const getAnimal = async (baseURL, animal, key) => {
//         // 1. This is the actual code to run if we want to simulate how actual server data is like
//         // const res = await fetch(baseURL+animal+key)
//         // 2. As we are not using a real API, we are simulating 
//         const res = await fetch('/fakeAnimalData')
//         try {
//             const data = await res.json();
//             console.log(data);
//             return data;
//         } catch(error) {
//             console.log("error", error)
//             // handle the error
//         }
//     }
//     // getAnimal(baseURL, newAnimal, apiKey);
//     getAnimal('/fakeAnimalData')
//     .then(function(data) {
//         console.log(data);
//     })
// }

// Original PerformAction function that took returned test data
function performAction(event) {
    event.preventDefault()

    let geoNamesBaseURL = `http://api.geonames.org/postalCodeSearch?placename=`
    let geoNamesLocation = `bangkok`
    let geoNamesRemainderURL = `&maxRows=10&username=andrewcccc`


    // Acknowledgement for the API we are going to send
    console.log(`We are going to call API for url:
    ${geoNamesBaseURL}${geoNamesLocation}${geoNamesRemainderURL}`)

    const getData = async() => {
        const response = await fetch("http://api.geonames.org/searchJSON?q=bangkok&maxRows=1&username=andrewcccc");
        try {
            const data = await response.json();
            console.log(`
-----------------------------------------
RETURNING FULL DATA
-----------------------------------------`);
            console.log(data);
            console.log(`
-----------------------------------------
RETURNING LAT LONG ONLY
-----------------------------------------`);
            console.log(`Lat: ${data.geonames[0].lat}, Long: ${data.geonames[0].lng}`);
            // return data;
        } catch(error) {
            console.log("error", error)
        }
    }

    getData();
}

export { performAction }

// Example of postal code search URL

// Search via place name (e.g. bangkok)
// http://api.geonames.org/postalCodeSearch?placename=bangkok&maxRows=10&username=andrewcccc

// Search via postal code
// http://api.geonames.org/postalCodeSearch?postalcode=9011&maxRows=10&username=andrewcccc

// Search via JSON
// http://api.geonames.org/searchJSON?q=bangkok&maxRows=1&username=andrewcccc