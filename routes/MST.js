const express = require('express');
const connection = require("../config/config");
const router = express.Router();
 
// Get a list of all mst data
 
router.post('/mstEstimate', (req, res) => {
  const mstId = req.body.mst_id;

    let ratio_mst = 0;
    if (req.body.mstdata_names === "Cow") {
      ratio_mst = 0.66;
  
    }else if(req.body.mstdata_names === "Human"){
      ratio_mst = 1;
  
    }else if(req.body.mstdata_names === "Dog"){
      ratio_mst = 0.01;
  
    }else if(req.body.mstdata_names === "Pig"){
      ratio_mst = 0.8;
  
    }
    else if(req.body.mstdata_names=== "Chicken"){
        ratio_mst = 0.01;
      }
     else {
      ratio_mst = req.body.ratio_mst; 
    }
  
     const count_estimate = req.body.count_mst * ratio_mst;
  
   const mstSql =
      'INSERT INTO mst_maker (mstdata_names, ratio_mst, count_mst, count_estimate, samplingId) VALUES (?, ?, ?, ?,? )';
  
    const mstBody = [
      req.body.mstdata_names,
      ratio_mst,
      req.body.count_mst,
      count_estimate,
      req.body.samplingId,
    ];
  
    connection.query(mstSql, mstBody, (err, results) => {
      if (err) {
        console.error('Error inserting mstdata:', err);
        res.status(500).send({ message: 'Error inserting mstdata' });
      } else {
        console.log('mstdata inserted successfully:', results);
        res.status(201).send({ message: 'mstdata added successfully', results });
      }
    });
  });
  
  module.exports = router;