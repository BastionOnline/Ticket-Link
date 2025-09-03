// get qr from url
const urlParams = new URLSearchParams(window.location.search);
const qr = urlParams.get('qr');
// var qr = "blue"; // for testing only, remove later
console.log("QR: " + qr);

const count = urlParams.get('count');
console.log("Count: " + count);

const qrLinks = {
    blue: "https://rebrand.ly/6e7eaa",
    orange: "https://rebrand.ly/fba5d2",
    green: "https://rebrand.ly/7f445a",
    purple: "https://rebrand.ly/cbfacc",
    yellow: "https://rebrand.ly/83eb95",
    red: "https://rebrand.ly/7d9b7e"
};

// if qr=null, load all
if (count === null) {
    try {
        const qrLower = qr ? qr.toLowerCase() : "";
        if (qrLinks[qrLower]) {
            window.location.replace(qrLinks[qrLower]);
        } else {
            console.log("reloading as count=1");
            window.location.href = "./?count=1";
        }
    } catch (error) {
        console.error("Error in forwarding function: ", error);
        window.location.href = "./?count=1";
    }
    
} else if (count === "1") {
    console.log("count=1, loading schedule");
}

// else go to sponsor.html or thankyou.html


const SUPABASE_URL = "https://hidtbyhdnandyamqgoib.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpZHRieWhkbmFuZHlhbXFnb2liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNTY2OTgsImV4cCI6MjA3MTkzMjY5OH0.vp7NaOZD_Oi78uXDMx9_HzMY1TJaXKKjFwWU-vaT4ko";

// ✅ Create client after library loads
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


// create module layout
    // when making modular, add to html <script type="module" src="./scripts/main.js"></script>
// make get url a function and export
// add null condition
// make qr

// pull schedule from supabase
async function loadSchedule() {
    const { data, error } = await supabaseClient
    .from('main_schedule')
    .select('*');

    if (error) {
        console.error(error);
        return;
    }

    // console.table(data)
    return data;
}

// filter schedule to see if any events are happening today
function dayFilter(data){
    const today = new Date();

//  // Filter by age
//     const filteredByAge = jsonData.filter(person => person.age === 30);
//     console.log(filteredByAge);
//     // Expected output: [{ "id": 1, "name": "Alice", "age": 30 }, { "id": 3, "name": "Charlie", "age": 30 }]

//     // Filter by name containing "o"
//     const filteredByName = jsonData.filter(person => person.name.includes("o"));
//     console.log(filteredByName);
//     // Expected output: [{ "id": 2, "name": "Bob", "age": 25 }]

    const filteredByToday = data.filter(event => {
        const eventStart = new Date(event.event_start_dt);
        const eventStop = new Date(event.event_stop_dt);
        return (today >= eventStart && today <= eventStop);
    });

    return filteredByToday;
}

// filter todays schedule by qr codes
function qrFilter(data, qr) {
    // console.log(data);

    var allQrs = ["red", "blue", "green", "yellow", "purple", "orange"];

    if (qr != null) {
        qr = qr.toLowerCase();
    }
    


    // trim qr and make lowercase
    const cleanData = data.map(event => ({
        ...event,
        qr_code: event.qr_code ? event.qr_code.trim().toLowerCase() : ""
    }));
    console.log(cleanData);

    // log qr first
    console.log(qr);
    // check if qr=all in array

    // return data if qr === null

    // ? after qr_code means to check if it exists first before running includes, otherwise it will error out
    if (cleanData.some(qrCodes => qrCodes.qr_code.includes("all"))) { // look for "all" in qr_code column

        console.log("All QR found");
        var filterAll = [...cleanData];
        filterAll = cleanData.filter(qrCodes => qrCodes.qr_code.includes("all"));
        console.log(filterAll);
        return filterAll;
    
    } else if (qr && cleanData.some(qrCodes => qrCodes.qr_code.includes(qr))) { // look for specific qr in qr_code column

        console.log("Specific QR found");
        var filterUser = [...cleanData];
        filterUser = filterUser.filter(qrCodes => qrCodes.qr_code.includes(qr));
        console.log(filterUser);
        return filterUser;

    } else if (cleanData.some(qrCodes => qrCodes.qr_code.includes("other"))) { // look for "other" in qr_code column

        console.log("Other QR found");
        var filterOther = [...cleanData];
        filterOther = cleanData.filter(qrCodes => qrCodes.qr_code.includes("other"));
        console.log(filterOther);
        return filterOther;

    } else {    // no match found, return day array
        
        console.log("No match found");
        console.log(cleanData);
        return cleanData;

    }
    // check qr against array first


    // check if qr=other in array



    // if 1 match, forward to link
    // if multiple, return array as buttons
    // if 0, go to thank you page


    // if (qr != null) {
    //     const filteredByQR = data.filter(event => event.qr_code === qr);
    //     console.log(filteredByQR);
    //     return filteredByQR;
    // } else {
    //     return data;
    // }
}

// based on QR code, forward to link or show links as buttons
function forwarding(data) {
    // link thank you directly
    try {


        console.log("Forwarding function called");
        console.log(data[0]?.link);

        const thankYou = './pages/thankYou.html'

        
        const lowerCaseLinkArray = data.map(event => ({
            ...event,
            link: event.link ? event.link.trim().toLowerCase() : ""
        }));
        console.log(lowerCaseLinkArray);

        // forwarding conditions
        if (data.length === 0) { // if the QR filter sent nothing, go to thank you page
            window.location.replace(thankYou);
        
        // if thank you in link, go to thank you page with params
        } else if (lowerCaseLinkArray.some(qrCodes => qrCodes.link.includes("thank you"))) { // if the QR filter found thank you, go to thank you page
        console.log("Thank you found");

        const paramsObject = {
            event_stop: data[0].event_stop_dt,
            location: data[0].location
        };

        const queryString = new URLSearchParams(paramsObject).toString();
        const redirectUrl = `${thankYou}?${queryString}`;

        console.log(redirectUrl);
        window.location.replace(redirectUrl);

        } else if (data.length === 1){     // if 1 match, forward to link
            // check if link is null or empty, if so go to thank you page with params
            if (data[0].link == null || data[0].link.trim() === "") {
                const paramsObject = {
                    event_stop: data[0].event_stop_dt,
                    location: data[0].location
                };

                const queryString = new URLSearchParams(paramsObject).toString();
                const redirectUrl = `${thankYou}?${queryString}`;

                console.log(redirectUrl);
                window.location.replace(redirectUrl);

            } else {    // if link exists, go to link
                
                // checks to see if link starts with http or https, if not add https:// to front
                let link = data[0].link;
                if (link && !/^https?:\/\//i.test(link)) {
                    link = 'https://' + link;
                }
                console.log('1 Link')
                console.log(link)
                console.log(data[0].event)
                window.location.replace(link);

                
            }
        } else {    // if multiple, show buttons
            console.log('Multiple Links found')
            const buttonContainer = document.getElementById("buttonContainer");

            // create button for each event
            data.forEach(event => {
                const button = document.createElement("button")

                button.addEventListener("click", () => {
                    window.location.href = event.link;
                });
                button.textContent = event.event;
                buttonContainer.appendChild(button)
            })

            const greetingContainer = document.getElementById("greetingContainer");

            const greeting = document.createElement("h1")
            greeting.innerHTML = "Welcome To Check Mates!";

            const instructions = document.createElement("h2")
            instructions.innerHTML = "Select your event below"

            greetingContainer.appendChild(greeting)
            greetingContainer.appendChild(instructions)

            console.log(`${data.length} Links`)

        }
    } catch (error) {
        console.error("Error in forwarding function:", error);
        window.location.replace('./pages/thankYou.html?forwardingUndefined=true');
    }
}

// pull schedule from supabase
loadSchedule()
    // filter schedule to see if any events are today
    .then(schedule => {
        const filteredDay = dayFilter(schedule);
        return filteredDay;
    })
    // filter todays schedeule by QR codes
    .then(filteredDay => {
        const filteredQR = qrFilter(filteredDay, qr)
        return filteredQR;
    })
    // based on QR code, forward to link or show links as buttons
    .then(qrReturn => {
        // need to use the word beside the .then function, because how it passes data
        const urlLink = forwarding(qrReturn);
        return urlLink
    });