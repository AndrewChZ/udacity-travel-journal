document.getElementById("check-button").addEventListener('click', performAction);


// let geoNamesBaseURL = `http://api.geonames.org/postalCodeSearch?placename=`,
// let geoNamesLocation = `bangkok`,
// let geoNamesRemainderURL = `&maxRows=10&username=andrewcccc`,

function performAction() {
    event.preventDefault()

    const getAnimal = async (baseURL, animal, key) => {
        // 1. This is the actual code to run if we want to simulate how actual server data is like
        // const res = await fetch(baseURL+animal+key)
        // 2. As we are not using a real API, we are simulating 
        const res = await fetch('/fakeAnimalData')
        try {
            const data = await res.json();
            console.log(data);
            return data;
        } catch(error) {
            console.log("error", error)
            // handle the error
        }
    }
    
    // getAnimal(baseURL, newAnimal, apiKey);
    getAnimal('/fakeAnimalData')
    .then(function(data) {
        console.log(data);
    })

}

export { performAction }

// Example of postal code search URL

// Search via place name (e.g. bangkok)
// http://api.geonames.org/postalCodeSearch?placename=bangkok&maxRows=10&username=andrewcccc

// Search via postal code
// http://api.geonames.org/postalCodeSearch?postalcode=9011&maxRows=10&username=andrewcccc