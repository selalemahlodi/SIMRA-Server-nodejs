const express = require('express');
const connection = require("../config/config");
const router = express.Router();

// Get parameters for a specific pathogen
router.post('/mstPathogen', (req, res) => {
  const pathogenName = req.body.pathogene_Name;
  const userCount = req.body.userCount;
  const e = 2.718;
  let pathogenResult = 0;
  let model = null;


    let alpha, beta, r, k, NFifty;
    switch (pathogenName) {
      case "Cryptosporidiumparvum":
        r = 0.059;
        pathogenResult = 1 - Math.pow(e, -r * userCount);
        model = 'exponential';
        break;
      case "EcoliO157H7":
        alpha = 0.4;
        beta = 54.9;
        pathogenResult = 1 - Math.pow((1 + userCount / beta), -alpha);
        model = 'beta-poisson';
        break;
      case "Campylobacterjejuni":
        alpha = 0.145;
        beta = 7.58;
        pathogenResult = 1 - Math.pow((1 + userCount / beta), -alpha);
        model = 'beta-poisson';
        break;
      case "Salmonellatyphi":
        alpha = 0.21;
        beta = 49.78;
        pathogenResult = 1 - Math.pow((1 + userCount / beta), -alpha);
        model = 'beta-poisson';
        break;
      case "SFlexneri":
        alpha = 0.256;
        beta = 1480;
        pathogenResult = 1 - Math.pow((1 + userCount / beta), -alpha);
        model = 'beta-poisson';
        break;
      case "Vibriocholera":
        alpha = 0.169;
        beta = 2305;
        pathogenResult = 1 - Math.pow((1 + userCount / beta), -alpha);
        model = 'beta-poisson';
        break;
      case "Giardialamblia":
        k = 0.0199;
        pathogenResult = 1 - Math.pow(e, -k * userCount);
        model = 'beta-poisson';
        break;
      case "Entamoebacoli":
        alpha = 0.101;
        NFifty = 341;
        pathogenResult = -((1 + userCount / NFifty) * Math.pow(2, 1) / 0.101);
        model = 'exponential';
        break;
      default:
        alpha = req.body.alpha;
    }
    // Perform the calculation based on the selected pathogen
  if (model === 'exponential') {
    pathogenResult = 1 - Math.pow(e, -alpha * userCount);
  } else if (model === 'beta-poisson') {
    pathogenResult = 1 - Math.pow((1 + userCount / beta), -alpha);
  }

    pathogenResult = Math.round(pathogenResult * 100) / 100;
    //const userCountValue = isNaN(userCount) ? null : userCount;

    const insertSql = 'INSERT INTO mstpathogen (pathogene_Name, userCount,pathogen_res,model,samplingId) VALUES (?, ?,?,?,?)';


    const insertBody = [pathogenName,userCount,pathogenResult,model,req.body.samplingId];

    connection.query(insertSql, insertBody, (err, results) => {
      if (err) {
        console.error('Error inserting pathogen:', err);
        return res.status(500).json({ error: 'Error inserting pathogen' });
      }

      res.status(201).send({
        message: 'Pathogen added successfully',
        results: {
          pathogenResult: pathogenResult,  // Include the pathogenResult in the response
        },
      });
    });
  
});

// Define a GET route for fetching the selected pathogenResult
router.get('/mstPathogen', (req, res) => { 
  // Fetch the last inserted pathogenResult from the database
  const sqlSelect = 'SELECT pathogen_res FROM mstpathogen ORDER BY mstPathogen_id  DESC LIMIT 1';

  connection.query(sqlSelect, (err, selectResults) => {
    if (err) {
      console.error('Error on selecting:', err);
      return res.status(500).json({ error: 'Error selecting pathogenResult' });
    }

    if (selectResults.length > 0) {
      const pathogen_res = selectResults[0].pathogen_res;
      console.log('Successfully selected pathogenResult:', pathogen_res);

      res.status(200).json({ pathogen_res });
    } else {
      console.log('No records found in parameters table.');
      return res.status(404).json({ error: 'No pathogenResult found' });
    }
  });
});

module.exports = router;