const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser
const fs = require('fs');
const reader = require('./reader');
const app = express();
const port = 8080;

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Assuming your JSON file is located at './data/nummerschild.json'
const jsonFilePath = './data/nummerschild.json';

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

// Handle form submission
// Handle GET request to search for city and state by initial
// Handle GET request to search for city and state by initial
app.get('/search', (req, res) => {
    const initialToFind = req.query.initial;
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            const result = reader.findCityAndStateByInitial(jsonData, initialToFind);

            if (result !== null) {
                res.json(result); // Send response as JSON object
            } else {
                res.status(404).json({"msg":"City not found"})
            }
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).send('Internal Server Error');
        }
    });
});


app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
