// Ticket automation step 2 - Redirect user to the correct website based on the source of the qr code

/* 

Redirect user to the correct website based on the source of the qr code
    - Extract the key-value pair from the qr code website query string:
        https://www.example.com/BlueQR.html?qr=blue

        - key = "qr"
        - value = "blue"

    - Save parameter as variable
    - Insert variable into the redirect query string

*/

// set qr pramater to be not case sensitive

// JS function to get query string value
const urlParams = new URLSearchParams(window.location.search);

// JS function to get the page title
// const qrSource = document.title.toLowerCase();
// console.log(qrSource);

// Get the value of the "qr" parameter
// if no value found, null is returned
const qrSource = urlParams.get('qr');

// Redirect to the index.html with the qrSource variable
// window.location.replace(`https://bastiononline.github.io/Ticket-Link/index?qr=${qrSource}`);
window.location.replace(`../index.html?qr=${qrSource}`);