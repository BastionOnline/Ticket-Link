// get url params
const urlParams = new URLSearchParams(window.location.search);
var event_stop = urlParams.get('event_stop');
var event_location = urlParams.get('location');
console.log(urlParams)
console.log("Event Stop: " + event_stop);
console.log("Location: " + event_location);


// create container for dynamic content
// script needs to be put at bottom of html so that DOM is loaded before script runs
// or use DOMContentLoaded event listener

// var event_stop = "2024-06-15T18:00:00"; // example
// var event_location = "North Building";

if (event_location) {
    const container = document.querySelector(".container");

    const eventDetails = document.createElement("p");
    eventDetails.innerHTML = `Your item has been checked in at the ${event_location} Check Room at the MTCC`;

    container.appendChild(eventDetails)
}


if (event_stop) {
    // format time
    const dateObj = new Date(event_stop);

    const timePart = dateObj.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    console.log("Time: " + timePart);

    const container = document.querySelector(".container");

    const eventStop = document.createElement("p");
    eventStop.innerHTML = `Coat Check closes at ${timePart}`;
    container.appendChild(eventStop);
}



