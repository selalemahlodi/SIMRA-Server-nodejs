const express = require('express');
const connection = require("../config/config");
const router = express.Router();


router.get('/login/:mobileNo', (req, res) => {
    const mobile_No = req.params.mobileNo;
    console.log(req.params.mobileNo);
    var sql = `SELECT * FROM user WHERE mobileNo =?`

    connection.query(sql, mobile_No, (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

router.get('/theuser', (req, res) => {
    // Access the username (mobileNo) from the query parameters
    const userId = req.query.userId; // replace on with the userId from Home    
    // Use the username to fetch data specific to the user
    const sql = `
        SELECT 
        userId,
        level,
        UPPER(SUBSTRING(firstname, 1, 1)) AS firstname,
        CONCAT(UPPER(SUBSTRING(lastname, 1, 1)), LOWER(SUBSTRING(lastname, 2))) AS lastname
        FROM user
        WHERE userId = ?
    `;
    connection.query(sql, [userId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        // Log the results to the console
        console.log('user Results:', results);
        // Send the retrieved data as JSON response
        res.json({ message: 'File data fetched successfully', success: true, results });
    });
});

// Admin login
router.get('/login/admin/:mobileNo', (req, res) => {
    const mobileNo = req.params.mobileNo;
    const sql = 'SELECT * FROM admin WHERE mobileNo = ?';

    connection.query(sql, [mobileNo], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

router.get('/theuseradmin', (req, res) => {
    const adminId = req.query.adminId;

    // Use different SQL queries for user and admin based on the user type
    const sqladmin = `
      SELECT 
      adminId,
      UPPER(SUBSTRING(firstname, 1, 1)) AS firstname,
      CONCAT(UPPER(SUBSTRING(lastname, 1, 1)), LOWER(SUBSTRING(lastname, 2))) AS lastname
      FROM admin
      WHERE adminId = ?
    `;

    connection.query(sqladmin, [adminId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        console.log('user Results:', results);
        res.json({ message: 'File data fetched successfully', success: true, results });
    });
});

// PUT /api/updateProfile - Update user profile route
router.put('/updateProfileAdmin', (req, res) => {
    const { adminId, firstname, lastname, password } = req.body;
  
    // Update the user's profile in the database
    const updateQuery = 'UPDATE admin SET firstname = ?, lastname = ?, password = ?  WHERE adminId = ?';
    connection.query(updateQuery, [firstname, lastname, password, adminId], (updateErr) => {
        if (updateErr) {
            console.error('Error during profile update:', updateErr);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
  
        res.json({ success: true, message: 'Profile updated successfully' });
    });
  });

module.exports = router;
