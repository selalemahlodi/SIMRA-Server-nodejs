

const express = require('express');
const connection = require("../config/config");
const router = express.Router();

// Your file.js route
router.get('/fileH2S', (req, res) => {
    const userId = req.query.userId; //req.params.userId;
    // Use the userId to fetch data specific to the user
    const sql = `
    SELECT 
    samplingdata.*, 
    hydrogensulfide.*, 
    watersource.type AS waterSourceType,    
    watersource.waterAccessability AS waterSourceAccess,
    municipality.*,
    coordinate.*
    FROM samplingdata
    LEFT JOIN coordinate ON samplingdata.samplingId = coordinate.samplingId
    LEFT JOIN hydrogensulfide ON samplingdata.samplingId = hydrogensulfide.samplingId
    LEFT JOIN watersource ON samplingdata.samplingId = watersource.samplingId
    LEFT JOIN municipality ON samplingdata.muni_id = municipality.muni_id
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

router.get('/fileSurvey', (req, res) => {
    const userId = req.query.userId; //req.params.userId;
    // Use the userId to fetch data specific to the user
    const sql = `
    SELECT 
    samplingdata.*, 
    sanitaryinpectionquestion.*, 
    watersource.type AS waterSourceType,    
    watersource.waterAccessability AS waterSourceAccess,
    municipality.*,
    coordinate.*
    FROM samplingdata
    LEFT JOIN sanitaryinpectionquestion ON samplingdata.samplingId = sanitaryinpectionquestion.samplingId
    LEFT JOIN coordinate ON samplingdata.samplingId = coordinate.samplingId
    
    LEFT JOIN watersource ON samplingdata.samplingId = watersource.samplingId
    LEFT JOIN municipality ON samplingdata.muni_id = municipality.muni_id
    

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
