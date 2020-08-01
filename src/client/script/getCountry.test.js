// test for getCountry.js
import { getCountry } from './getCountry';

jest.mock('./getCountry');

test('We should be able to pick a valid country from the HTML', () => {
    // Set up our document body
    document.body.innerHTML =
    `<input type="text" placeholder="Country" value="Singapore" id="country-field"></input>`

    expect(getCountry()).not.toBeNull();
})