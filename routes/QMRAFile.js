const express = require('express');
const connection = require('../config/config');
const router = express.Router();

router.get('/QMRA', (req, res) => {
    // Access the username (mobileNo) from the query parameters
    const userId = req.query.userId;//replace on with the userId from Home 


    // Use the username to fetch data specific to the user
    const sql = `
    SELECT
    samplingdata.*,
    user.userId,
    UPPER(SUBSTRING(user.firstname, 1, 1)) AS firstname,
    CONCAT(UPPER(SUBSTRING(user.lastname, 1, 1)), LOWER(SUBSTRING(user.lastname, 2))) AS lastname,
    watersource.*,
    municipality.*,
    coordinate.*,
    fibdata.*
    FROM
    samplingdata
    JOIN
    user ON samplingdata.userId = user.userId 
    JOIN
    watersource ON samplingdata.samplingId = watersource.samplingId
    JOIN
    municipality ON samplingdata.muni_id = municipality.muni_id
    JOIN
    coordinate ON samplingdata.samplingId = coordinate.samplingId
    JOIN
    fibdata ON samplingdata.samplingId = fibdata.samplingId
    WHERE samplingdata.userId = ?
  `;

    connection.query(sql, [userId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        // Log the results to the console
        console.log('Query Results:', results);


        // Send the retrieved data as JSON response
        res.json({ message: 'File data fetched successfully', success: true, results });

    });
});

router.get('/MST', (req, res) => {
    // Access the username (mobileNo) from the query parameters
    const userId = req.query.userId;//replace on with the userId from Home 


    // Use the username to fetch data specific to the user
    const sql = `
    SELECT
    samplingdata.*,
    user.userId,
    UPPER(SUBSTRING(user.firstname, 1, 1)) AS firstname,
    CONCAT(UPPER(SUBSTRING(user.lastname, 1, 1)), LOWER(SUBSTRING(user.lastname, 2))) AS lastname,
    watersource.*,
    municipality.*,
    coordinate.*,
    mst_maker.*
    FROM
    samplingdata
    JOIN
    user ON samplingdata.userId = user.userId 
    JOIN
    watersource ON samplingdata.samplingId = watersource.samplingId
    JOIN
    municipality ON samplingdata.muni_id = municipality.muni_id
    JOIN
    coordinate ON samplingdata.samplingId = coordinate.samplingId
    JOIN
    mst_maker ON samplingdata.samplingId = mst_maker.samplingId
    WHERE samplingdata.userId = ?
  `;

    connection.query(sql, [userId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        // Log the results to the console
        console.log('Query Results:', results);


        // Send the retrieved data as JSON response
        res.json({ message: 'File data fetched successfully', success: true, results });

    });
});

router.get('/pathodenFile', (req, res) => {
    // Access the username (mobileNo) from the query parameters
    const userId = req.query.userId;//replace on with the userId from Home 


    // Use the username to fetch data specific to the user
    const sql = `
    SELECT
    samplingdata.*,
    user.userId,
    UPPER(SUBSTRING(user.firstname, 1, 1)) AS firstname,
    CONCAT(UPPER(SUBSTRING(user.lastname, 1, 1)), LOWER(SUBSTRING(user.lastname, 2))) AS lastname,
    watersource.*,
    municipality.*,
    coordinate.*,
    mstpathogen.*
    FROM
    samplingdata
    JOIN
    user ON samplingdata.userId = user.userId 
    JOIN
    watersource ON samplingdata.samplingId = watersource.samplingId
    JOIN
    municipality ON samplingdata.muni_id = municipality.muni_id
    JOIN
    coordinate ON samplingdata.samplingId = coordinate.samplingId
    JOIN
    mstpathogen ON samplingdata.samplingId = mstpathogen.samplingId
    WHERE samplingdata.userId = ?
  `;

    connection.query(sql, [userId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        // Log the results to the console
        console.log('Query Results:', results);


        // Send the retrieved data as JSON response
        res.json({ message: 'File data fetched successfully', success: true, results });

    });
});

module.exports = router;
