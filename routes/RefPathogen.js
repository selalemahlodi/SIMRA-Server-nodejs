const express = require('express');
const connection = require("../config/config");
const router = express.Router();

// Initialize model as null
let model = null;
let selectedPathogenName = null;


router.post('/referencepathogen', (req, res) => {
    // Check if pathogenName is provided in the request body
    if (!req.body.pathogenName) {
      return res.status(400).json({ error: 'pathogenName is required' });
    }

    // Set the selected pathogenName based on the client's request
  selectedPathogenName = req.body.pathogenName;

    // Set the model based on the pathogenName
    switch (selectedPathogenName) {
      case "Cryptosporidiumparvum":
        model = 'exponential';
        break;
      case "EcoliO157H7":
      case "Campylobacterjejuni":
      case "Salmonellatyphi":
      case "SFlexneri":
      case "Vibriocholera":
        model = 'beta-poisson';
        break;
      case "Giardialambia":
        model = 'beta-poisson';
        break;
      case "Entamoebacoli":
        model = 'exponential';
        break;
        default:
    // Handle unrecognized pathogenName
    return res.status(400).json({ error: 'Invalid pathogenName' });
    }

    const PrSql = 'INSERT INTO referencepathogen (pathogenName, model) VALUES (?, ?)';

    connection.query(PrSql, [selectedPathogenName, model], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(rows);
    });
}); 



// Define a GET route for fetching the selected pathogenName
router.get('/referencepathogen', (req, res) => {
  if (selectedPathogenName) {
    // If a pathogenName has been set, return it
    res.json({ pathogenName: selectedPathogenName });
  } else {
    return res.status(404).json({ error: 'No pathogenName found' });
  }
});


module.exports = router;



