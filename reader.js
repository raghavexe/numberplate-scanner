// reader.js

const fs = require('fs');

// Define a function to find city by initial
function findCityAndStateByInitial(jsonData, initial) {
    for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].initials === initial) {
            return jsonData[i]; // Return the whole object if the initial is found
        }
    }
    return null; // Return null if the initial is not found
}


// Export the function to be used in other files
module.exports = {
    findCityAndStateByInitial: findCityAndStateByInitial
};
