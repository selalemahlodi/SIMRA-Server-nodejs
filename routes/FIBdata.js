const express = require('express');
const connection = require("../config/config");
const router = express.Router();
 
// Get a list of all reference pathogens

router.post('/FIBdata', (req, res) => {

    let ratio = 0;
    if (req.body.indicator_name === "EColi") {
      ratio = 0.66;
  
    }else if(req.body.indicator_name === "Coliforms"){
      ratio = 1;
  
    }else if(req.body.indicator_name === "Enterococcus"){
      ratio = 0.01;
  
    }else if(req.body.indicator_name === "Clostridium"){
      ratio = 0.8;
  
    }
     else {
      ratio = req.body.ratio;  
    }
  
     const countAverage = req.body.count * ratio;
  
    const pathogenSql =
      'INSERT INTO FIBdata (indicator_name, ratio, count, countAverage, samplingId) VALUES (?, ?, ?, ?, ?)';
  
    const pathogenBody = [
      req.body.indicator_name,
      ratio,
      req.body.count,
      countAverage,
      req.body.samplingId,
    ];
  
    connection.query(pathogenSql, pathogenBody, (err, results) => {
      if (err) {
        console.error('Error inserting pathogen:', err);
        res.status(500).send({ message: 'Error inserting pathogen' });
      } else {
        console.log('Pathogen inserted successfully:', results);
        res.status(201).send({ message: 'Pathogen added successfully', results });
      }
    });
  });
  
  module.exports = router;