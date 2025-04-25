/* 

Redirect user to the correct website based on the source of the qr code
    - Extract the key-value pair from the qr code website query string:
        https://www.example.com/BlueQR.html?qr=blue

        - key = "qr"
        - value = "blue"

    - Save parameter as variable
    - Insert variable into the redirect query string

*/
const urlParams = new URLSearchParams(window.location.search);
const qrSource = urlParams.get('qr');


// window.location.replace("https://rebrand.ly/e1ccaeu");

// index via brandly
// window.location.replace("https://rebrand.ly/w5le5nm");

// index via link
//window.location.replace("https://bastiononline.github.io/Ticket-Link/index?Blue");
window.location.replace(`https://bastiononline.github.io/Ticket-Link/index?qr=${qrSource}`);

// if RGBYOP send off to next link with ?Colour