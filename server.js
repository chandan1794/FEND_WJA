// Setup empty JS object to act as endpoint for all routes
projectData = {"thing":"Something"};

// Require Express to run server and routes
const express = require('express');
const port = 3000;

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, () => console.log(`Server running at localhost:${port}`));

app.get('/all', sendData);

function sendData (request, response) {
  response.send(projectData);
};

// POST a weather condition
const data = [];

app.post('/add', addFetchedWeather);

function addFetchedWeather (req,res){
    data.push(req.body);
    res.send(data);
};

