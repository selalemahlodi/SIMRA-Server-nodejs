const express = require('express');
const connection = require('../config/config');
const router = express.Router();

// Get Probability of infection from the database
router.post('/likelyhood', (req, res) => {
  const exposureName = req.body.exposureName; // Change req.params to req.body
  let paramId;
  let qslQ = 0;
  let n = 0, pn = 0;  

  const callAveCount = (callback) => {
    const sqlQ = 'SELECT pathogenResult, parameterid FROM parameters ORDER BY parameterid DESC LIMIT 1';

    connection.query(sqlQ, (err, rows) => {
      if (err) { 
        console.error('Error fetching data from the database:', err);
        return callback(err, null);
      }

      if (rows.length > 0) {
        qslQ = parseFloat(rows[0].pathogenResult);
        paramId = parseInt(rows[0].parameterid);
      }

      callback(null, qslQ, paramId);
    });
  };

  // Call the function to fetch paramId and countAverage
  callAveCount((err, qslQ, paramId) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve data from the database' });
    }

    switch (exposureName) {
      case "Weekly":
        n = 7;
        pn = 1 - Math.pow((1 - qslQ), -n);
        break;
      case "Monthly":
        n = 12;
        pn = 1 - Math.pow((1 - qslQ), -n);
        break;
      case "Half yearly":
        n = 183;
        pn = 1 - Math.pow((1 - qslQ), -n);
        break;
      case "Yearly":
        n = 365;
        pn = 1 - Math.pow((1 - qslQ), -n);
        break;
      case "Quarterly":
        n = 91;
        pn = 1 - Math.pow((1 - qslQ), -n);
        break;
      default:
        return res.status(400).json({ error: 'Invalid exposureName' });
    }

    const exposureResult = Math.round(pn * 100) / 100;

    const insertValues = 'INSERT INTO explosure (explosure_name, explosure_result, parameterid) VALUES (?, ?, ?)';
    const insertResult = [
      exposureName,
      exposureResult,
      paramId,
    ];

    connection.query(insertValues, insertResult, (err, results) => {
      if (err) {
        console.error('Error inserting exposure:', err);
        return res.status(500).json({ error: 'Error inserting exposure' });
      }

      console.log('exposure inserted successfully:', results);
      
      // Automatically select the current last index
      const sqlSelect = 'SELECT explosure_result FROM explosure ORDER BY explosure_id DESC LIMIT 1';
      connection.query(sqlSelect, (err, selectResults) => {
        if (err) {
          console.error('Error on selecting:', err);
          return res.status(500).json({ error: 'Error selecting explosure_result' });
        }
    
        if (selectResults.length > 0) {
          const currentexplosure_result = selectResults[0].explosure_result;
          console.log('Successfully selected explosure_result:', currentexplosure_result);
          // You can use currentexplosure_result as needed.
        } else {
          console.log('No records found in explosure table.');
        }
        
        res.status(201).send({ message: 'Pathogen added successfully', results });
      });

      
    });
  });
});

module.exports = router;