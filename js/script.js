// get link to qr, get title of page linked to, if it is Link, continue, if not go to link.html man
// if deprecated use: (0) CSVJSON, (1) export google Apps Script, (2) python csv to json, (3) download csv method on client
// (0) https://csvjson.com/csv2json
// (3) https://docs.google.com/spreadsheets/d/{spreadsheetId}/export?format=csv&id={spreadsheetId}&gid={sheetGid}

// const spreadsheetId = '1fKISONfWtxZZIRK_5VHHabB8yXEKH_ss86TDDuCov-I';
const spreadsheetId = '1ZYA5DaiQsGYdKsY45IhDPlhtXns_FuprLuzE673KtuY';
const sheetName = 'Main Schedule';

const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

const homePage = 'pages/thankYou.html'

fetch(url)
    .then(response => response.text())
    .then(rawText => {
        const jsonText = rawText.substring(
            rawText.indexOf('{'),
            rawText.lastIndexOf('}') + 1
        );

        const json = JSON.parse(jsonText);
        const rows = json.table.rows;

        if (!rows.length) {
            console.log("No data found.");
            return;
        }

        // Get header names from 'cols'
        const headers = json.table.cols.map(col => col.label);

        // Find column indexes for Date and Name
        const eventStartIndex = headers.indexOf("Event Start DT");
        const eventStopIndex = headers.indexOf("Event Stop DT");
        const eventIndex = headers.indexOf("Event");
        const linkIndex = headers.indexOf("Link");
        const counterIndex = headers.indexOf("Counter");

        if (eventStartIndex === -1 || eventStopIndex === -1 || eventIndex === -1 || linkIndex === -1 || counterIndex === -1) {

            console.error("Required columns not found.");
            console.log("Available headers:", headers);
            return;
        }

        const today = Date.now()
        const eventsToday = []

        // Loop through data rows
        rows.forEach(row => {
            const cells = row.c;

            const eventStart = cells[eventStartIndex] ? cells[eventStartIndex].v : '';
            const eventStop = cells[eventStopIndex] ? cells[eventStopIndex].v : '';
            const eventName = cells[eventIndex] ? cells[eventIndex].v : '';
            const link = cells[linkIndex] ? cells[linkIndex].v : '';
            const counter = cells[counterIndex] ? cells[counterIndex].v : '';

            console.log(`Event Start: ${eventStart} Event Stop: ${eventStop}, EventName: ${eventName}, Link: ${link}`);
            var eventStartParsed = Date.parse(`${eventStart}`)
            var eventStopParsed = Date.parse(`${eventStop}`)

            console.log(today);
            console.log(eventStartParsed);
            console.log(eventStopParsed);

            if (today >= eventStartParsed && today <= eventStopParsed) {
                eventsToday.push({
                    name: eventName || link,
                    link: counter || link || homePage || "https://www.mtccc.com/"

                })
                console.log(eventsToday)
            } else {
                console.log("alternate")
            }
        });

        console.log(eventsToday.length)

        if (eventsToday.length === 0) {
            window.location.replace(homePage);
            console.log(homePage)
        } else if (eventsToday.length === 1){
            window.location.replace(eventsToday[0].link);
            console.log('1 Link')
        } else {
            const buttonContainer = document.getElementById("buttonContainer");

            eventsToday.forEach(event => {
                const button = document.createElement("button")

                button.addEventListener("click", () => {
                    window.location.href = event.link;
                });
                button.textContent = event.name;
                buttonContainer.appendChild(button)
            })

            const greetingContainer = document.getElementById("greetingContainer");

            const greeting = document.createElement("h1")
            greeting.innerHTML = "Welcome To Check Mates!";

            const instructions = document.createElement("h2")
            instructions.innerHTML = "Select your event below"

            greetingContainer.appendChild(greeting)
            greetingContainer.appendChild(instructions)

            console.log(`${eventsToday.length} Links`)
            console.log(`${window.location.href} test`)

            const currentLocation = window.location.href
            const colour = currentLocation.split("?")[1]
            console.log(colour)
        }

        })
    .catch(error => console.error('Error fetching data:', error));
