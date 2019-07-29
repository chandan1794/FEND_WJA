/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apikey = 'bcce1b951875cb5081996281fb4acf3c'
// web uri to create api request
const uri = 'https://api.openweathermap.org/data/2.5/weather?zip='

/* Helper Functions */
function generateURL(zipcode) {

    return uri + zipcode + '&appid=' + apikey;
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', getDataAndUpdateUI);

/* Function called by event listener */
function updateUI(date, temp, content) {

    document.getElementById('date').innerHTML = date;
    document.getElementById('temp').innerHTML = temp;
    document.getElementById('content').innerHTML = content;
}

/* Function to GET Web API Data*/
async function getWeatherData(zipcode) {

    // getting weather data using the api
    let request = generateURL(zipcode);
    console.log(request);
    let response = await fetch(request);
    // extracting the data as JSON
    try {
        return await response.json()
    }
    catch(error) {
        console.log("error", error);
    }
}

function getDataAndUpdateUI(){
    zipcode = document.getElementById('zip').value

    getWeatherData(zipcode).then(data => {
        let temp = data.main.temp;
        content = document.getElementById('feelings').value
        updateUI(newDate, temp, content);
    });
}

async function postWeatherData( url = '', data = {}) {

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};
