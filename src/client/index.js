import "./style/style.scss";
import { performAction } from './script/form-button.js'
import { displaySearchInput } from './script/form-button.js'
// import bgImg from './img/bg-image.png'
import icnFlightArrive from './img/icn_flight-arrive.png'
import icnFlightDepart from './img/icn_flight-depart.png'
import icnFlightDepartBlack from './img/icn_flight-depart-black.png'
import icnLocation from './img/icn_location.png'
import icnWeatherBlack from './img/icn_weather-black.png'

export { icnFlightArrive, icnFlightDepart, icnLocation, icnFlightDepartBlack, icnWeatherBlack, performAction, displaySearchInput };

console.log("Load successful");

// document.getElementById("bg-image").addEventListener('load', () => {
//   console.log("bg-image is loaded successfully!");
// });


window.addEventListener('load', displaySearchInput);

if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
     navigator.serviceWorker.register('/service-worker.js').then(registration => {
       console.log('SW registered: ', registration);
     }).catch(registrationError => {
       console.log('SW registration failed: ', registrationError);
     });
   });
 }