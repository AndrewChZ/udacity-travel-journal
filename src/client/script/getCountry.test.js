// const country = require('./form-button')
import { getCountry } from './getCountry';

jest.mock('./getCountry');

test('We should be able to pick a valid country from the HTML', () => {
    // Set up our document body
    document.body.innerHTML =
    `<input type="text" placeholder="Country" value="Singapore" id="country-field"></input>`

    expect(getCountry()).not.toBeNull();
})

// const sum = require('./sum');

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });


// const generateHeadline = require('./generateHeadline')

// import { generateHeadline } from './generateHeadline';

// jest.mock('./generateHeadline');

// test ('Provides us with a list of headlines that we can randomly pick from', () => {

//     // const generateHeadline = require('./generateHeadline')

//     // Set up our document body
//     document.body.innerHTML =
//         '<p>Type in your content or or <a href="" onclick="return generateHeadline()">test a random piece</a></p>' +
//         '<input id="name" type="text" name="input" onkeypress="return inputValidate(event)" placeholder="Input any content here">';

//     expect(generateHeadline()).toBeUndefined();
// })