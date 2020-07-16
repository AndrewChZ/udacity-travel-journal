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

    // Tried defining getData from the weather diary assignment
    const getData = async () => {
        const res = await fetch("http://api.geonames.org/postalCodeSearch?placename=bangkok&maxRows=10&username=andrewcccc")
        try {
            console.log("Fetching data")
            const data = await res.text();
            // console.log(data);
            return data;
        } catch(error) {
            console.log("error", error)
        }
    }

    // Tried defining getData from the front end evaluation assignment
    // async function getData(content) {
    //     try {
    //         const settings = {
    //             method: 'POST', 
    //             credentials: 'same-origin',
    //             headers: {
    //                 "Content-Type": "application/json;charset=utf-8",
    //             },    
    //         body: JSON.stringify({ text: content }), 
    //         }; 
    //     const res = await fetch(geoNamesBaseURL, geoNamesLocation, geoNamesRemainderURL);
    //     return res;
    //     } catch (error) {
    //         console.log("An error has occured", error);
    //     }
    // }

    getData(geoNamesBaseURL, geoNamesLocation, geoNamesRemainderURL)
      .then(function(data) {
        // console.log(`Check if data is JSON: ${JSON.parse(data)}`)
        console.log(`-------------------------`)
        console.log(`Output data as is:`)
        console.log(data)
    //   .then(
    //       updateUI()
    //   )
      })
}

export { performAction }

// Example of postal code search URL

// Search via place name (e.g. bangkok)
// http://api.geonames.org/postalCodeSearch?placename=bangkok&maxRows=10&username=andrewcccc

// Search via postal code
// http://api.geonames.org/postalCodeSearch?postalcode=9011&maxRows=10&username=andrewcccc