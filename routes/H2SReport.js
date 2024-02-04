const express = require('express');
const connection = require("../config/config");
const mysql = require('mysql');
const router = express.Router();


router.get('/filedata', (req, res) => {
    // Access the userId from the request object
    /*function getUserId(callback){
        let Sql = 'SELECT userId FROM user WHERE firstname = ?';
        let username = 'Gift';

        connection.query(Sql,[userId],(err, results) => {
            if (err) {
                console.error(err);
                return;
            }
            if (results.length > 0){
            let userId = results[0].userId;
            callback(userId);
            }
            else{
                res.status(404).json({ message: 'Not Found' });
            }
        });
    }
});
    function getData(userId){*/
    const userId = 1; //req.params.userId;
    // Use the userId to fetch data specific to the user
    const sql = `
    SELECT 
    samplingdata.*, 
    coordinate.longitude, 
    coordinate.latitude, 
    sanitaryinpectionquestion.*, 
    watersource.type AS waterSourceType,    
    watersource.waterAccessability AS waterSourceAccess
    FROM samplingdata
    LEFT JOIN coordinate ON samplingdata.samplingId = coordinate.samplingId
    LEFT JOIN sanitaryinpectionquestion ON samplingdata.samplingId = sanitaryinpectionquestion.samplingId
    LEFT JOIN watersource ON samplingdata.samplingId = watersource.samplingId
    WHERE samplingdata.userId = ?`;

    connection.query(sql,[userId],(err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        // Send the retrieved data as JSON response
        res.json({ message: 'File data fetched successfully', success: true, results});
    });
    
});

module.exports = router;
