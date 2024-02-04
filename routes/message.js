// for user registration functionality
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connection = require('../config/config');
const axios = require('axios');


// POST /api/register - User registration route
router.post('/message', (req, res) => {
    const { firstname, lastname, message } = req.body;
    console.log(firstname, lastname, message)
    // Insert the registration data into the user table
    const insertQuery = `INSERT INTO message (firstname, lastname, message) VALUES (?, ?, ?)`;
    connection.query(insertQuery, [firstname, lastname, message], (err) => {
        if (err) {
            console.error('Error during registration:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        else {
            res.json({ message: 'messsage sent  successfully' });
            // Notify the admin
           //notifyAdmin({ firstname, lastname, message });
        }
    });

});
module.exports = router;

