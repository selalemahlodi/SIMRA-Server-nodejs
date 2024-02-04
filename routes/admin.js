// for user registration functionality
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
// Import the database connection configuration
const connection = require('../config/config');

// POST /api/register - User registration route
router.post('/register/admin', (req, res) => {
  const { mobileNo, password, firstname, lastname } = req.body;

  // Validate password complexity on the server
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: 'Password must contain at least one letter and one number, and be at least 8 characters long' });
  }

  // Check if the mobile number already exists in the database
  const checkQuery = 'SELECT * FROM admin WHERE mobileNo = ?';
  connection.query(checkQuery, [mobileNo], async (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking mobile number:', checkErr);
      return res.status(500).json({ message: 'Server error' });
    }

    // If a user with the same mobile number already exists, return an error response
    if (checkResults.length > 0) {
      return res.status(400).json({ message: 'Mobile number already registered' });
    }


    console.log(mobileNo, password, firstname, lastname)
    // Insert the registration data into the user table
    const insertQuery = `INSERT INTO admin (mobileNo, password, firstname, lastname) VALUES (?, ?, ?, ?)`;
    connection.query(insertQuery, [mobileNo, password, firstname, lastname], (err) => {
      if (err) {
        console.error('Error during registration:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      else {
        res.json({ message: 'User registered successfully' });
      }
    });
  });
});



module.exports = router;

