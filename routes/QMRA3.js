const express = require('express');
const connection = require("../config/config");
const router = express.Router();

// Get parameters for a specific pathogen
router.post('/QRMAlevel3', (req, res) => {
  const pathogenName = req.body.pathogenName;
  const e = 2.718;
  let pathogenResult = 0;
  let countestimate = 0;
  let mstdata_Id;

  // Define a function to fetch all data from FIBdata
  const callAveCount = (callback) => {
    const sqlQuery = 'SELECT count_estimate, mstdata_id FROM mst_maker ORDER BY mstdata_id DESC LIMIT 1';

    connection.query(sqlQuery, (err, rows) => {
      if (err) {
        console.error('Error fetching data from the database:', err);
        return callback(err, null);
      }

      if (rows.length > 0) {
        countestimate  = parseInt(rows[0].count_estimate);
        mstdata_Id = parseInt(rows[0].mstdata_id);
      }

      callback(null, countestimate , mstdata_Id);
    });
  };
  // Call the function to fetch mstdata_Id and count_estimate
  callAveCount((err, countestimate , mstdata_Id) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve data from the database' });
    }

    let alpha, beta, r, k, NFifty;
    switch (pathogenName) {
      case "Cryptosporidiumparvum":
        r = 0.059;
        pathogenResult = 1 - Math.pow(e, -r * countestimate );
        break;
      case "EcoliO157H7":
        alpha = 0.4;
        beta = 54.9;
        pathogenResult = 1 - Math.pow((1 + countestimate  / beta), -alpha);
        break;
      case "Campylobacterjejuni":
        alpha = 0.145;
        beta = 7.58;
        pathogenResult = 1 - Math.pow((1 + countestimate  / beta), -alpha);
        break;
      case "Salmonellatyphi":
        alpha = 0.21;
        beta = 49.78;
        pathogenResult = 1 - Math.pow((1 + countestimate  / beta), -alpha);
        break;
      case "SFlexneri":
        alpha = 0.256;
        beta = 1480;
        pathogenResult = 1 - Math.pow((1 + countestimate  / beta), -alpha);
        break;
      case "Vibriocholera":
        alpha = 0.169;
        beta = 2305;
        pathogenResult = 1 - Math.pow((1 + countestimate  / beta), -alpha);
        break;
      case "Giardialamblia":
        k = 0.0199;
        pathogenResult = 1 - Math.pow(e, -k * countestimate );
        break;
      case "Entamoebacoli":
        alpha = 0.101;
        NFifty = 341;
        pathogenResult = -((1 + countestimate  / NFifty) * Math.pow(2, 1) / 0.101);
        break;
      default:
        alpha = req.body.alpha;
    }

    pathogenResult = Math.round(pathogenResult * 100) / 100;

    const insertSql = 'INSERT INTO parameters (alpha, beta, r, k, NFifty, pathogenName, indicatorid, pathogenResult) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const insertBody = [
      alpha,
      beta,
      r,
      k,
      NFifty,
      pathogenName,
      mstdata_Id,
      pathogenResult,
    ];

    connection.query(insertSql, insertBody, (err, results) => {
      if (err) {
        console.error('Error inserting pathogen:', err);
        return res.status(500).json({ error: 'Error inserting pathogen' });
      }

      console.log('Pathogen inserted successfully:', results);
      res.status(201).send({
        message: 'Pathogen added successfully',
        results: { pathogenResult },
      });
      
    });
  });
});

// Define a GET route for fetching the selected pathogenResult
router.get('/QRMAlevel3', (req, res) => {
    // Fetch the last inserted pathogenResult from the database
    const sqlSelect = 'SELECT pathogenResult FROM parameters ORDER BY parameterid DESC LIMIT 1';
  
    connection.query(sqlSelect, (err, selectResults) => {
      if (err) {
        console.error('Error on selecting:', err);
        return res.status(500).json({ error: 'Error selecting pathogenResult' });
      }
  
      if (selectResults.length > 0) {
        const pathogenResult = selectResults[0].pathogenResult;
        console.log('Successfully selected pathogenResult:', pathogenResult);
  
        res.status(200).json({ pathogenResult });
      } else {
        console.log('No records found in parameters table.');
        return res.status(404).json({ error: 'No pathogenResult found' });
      }
    });
  });

module.exports = router;