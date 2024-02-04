const express = require('express');
const connection = require("../config/config");
const router = express.Router();

router.get('/allusers', (req, res) => {
    const query = 'SELECT userId,mobileNo,password,firstname,lastname,level FROM user WHERE level = 2 || level = 3 || level = 1';
    console.log('query', query);
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error retrieving users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const users = results.map(user => {

                console.error('Id retrieving user:', user.userId);

                return {
                    id: user.userId,
                    mobileNo: user.mobileNo,
                    password: user.password,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    level: user.level,

                };
            });

            res.json(users);
        }
    });
});

router.get('/count', (req, res) => {

    const sql = `
    SELECT 
    COUNT(userId) AS count
    FROM user
    WHERE level = 2 || level = 3 || level = 1
  `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        console.log('Results:', results);

        res.json({ message: 'File data fetched successfully', success: true, results });

    });
});


router.delete('/allusers/:mobileNo', (req, res) => {
    const mobileNo = req.params.mobileNo;
    console.log('Deleting event with ID:', mobileNo);
    // Assuming you are using MySQL or a similar database
    const query = 'DELETE FROM user WHERE mobileNo = ?';

    // Execute the query
    connection.query(query, [mobileNo], (error, results, fields) => {
        if (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.affectedRows > 0) {
                console.log('user deleted successfully:', results);
                res.status(200).json({ message: 'user deleted successfully' });
            } else {
                console.log('user not found');
                res.status(404).json({ error: 'user not found' });
            }
        }
    });
});

module.exports = router