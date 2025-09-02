// get url params
const urlParams = new URLSearchParams(window.location.search);
const event_stop = urlParams.get('event_stop');
const event_location = urlParams.get('location');
console.log("Event Stop: " + event_stop);
console.log("Location: " + event_location);

// format time
const dateObj = new Date(event_stop);

const timePart = dateObj.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
});

console.log("Time: " + timePart);

// create container for dynamic content
// script needs to be put at bottom of html so that DOM is loaded before script runs
// or use DOMContentLoaded event listener

const container = document.querySelector(".container");

const eventDetails = document.createElement("p");
eventDetails.innerHTML = `Your item has been checked in at the ${event_location} Check Room at the MTCC<br><br>Coat Check closes at ${timePart}`;

container.appendChild(eventDetails)