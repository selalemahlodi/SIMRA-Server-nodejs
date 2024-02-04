const express = require('express');
const multer = require('multer');
const path = require('path');
const connection = require('../config/config');
const router = express.Router();

// Dynamically determine the project root
const projectRoot = path.join(__dirname, '.../'); // Adjust the number of '..' based on your project structure
const uploadPath = '..\\SIMRA-Web\\public\\images'

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('Upload Path:', uploadPath); // Log the upload path
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + path.extname(file.originalname);
        console.log('Generated Filename:', filename); // Log the generated filename
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

router.post('/Event', upload.single('eventImage'), (req, res) => {
    const { eventName, eventDate, eventTime, eventVenue, eventDescription } = req.body;
    const imagePath = req.file ? req.file.path : null; // Check if a file was uploaded

    // Log the file path
    console.log('File Path:', imagePath);

    // Assuming you are using MySQL or a similar database
    const query = 'INSERT INTO Event (name, date, time, venue, image_path, description) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [eventName, eventDate, eventTime, eventVenue, imagePath, eventDescription];

    // Execute the query
    connection.query(query, values, (error, results, fields) => {
        if (error) {
            console.error('Error inserting event:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Event inserted successfully:', results);
            res.status(200).json({ message: 'Event added successfully' });
        }
    });
});

router.get('/Events', (req, res) => {
    const query = 'SELECT * FROM Event';

    connection.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error retrieving events after update:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Log the events or any relevant information
            console.log('Events after update:', results);

            // Map and send the events in the response
            const events = results.map(event => {
                const imagePath = event.image_path;
                return {
                    id: event.event_id,
                    name: event.name,
                    date: event.date,
                    time: event.time,
                    venue: event.venue,
                    description: event.description,
                    image: imagePath ? path.join(__dirname, '..', imagePath) : null,
                };
            });

            res.json(events);
        }
    });
});



router.delete('/Event/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    console.log('Deleting event with ID:', eventId);
    // Assuming you are using MySQL or a similar database
    const query = 'DELETE FROM Event WHERE event_id = ?';
    
    // Execute the query
    connection.query(query, [eventId], (error, results, fields) => {
        if (error) {
            console.error('Error deleting event:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.affectedRows > 0) {
                console.log('Event deleted successfully:', results);
                res.status(200).json({ message: 'Event deleted successfully' });
            } else {
                console.log('Event not found');
                res.status(404).json({ error: 'Event not found' });
            }
        }
    });
});
router.get('/Event/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    const query = 'SELECT * FROM Event WHERE event_id = ?';
 
    connection.query(query, [eventId], (error, results, fields) => {
       if (error) {
          console.error('Error retrieving event details for update:', error);
          res.status(500).json({ error: 'Internal Server Error' });
       } else {
          if (results.length > 0) {
             const eventDetails = results[0];
             res.json(eventDetails);
          } else {
             res.status(404).json({ error: 'Event not found' });
          }
       }
    });
 });

 router.put('/Event/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    const { eventName, eventDate, eventTime, eventVenue, eventDescription } = req.body;

    // Assuming you are using MySQL or a similar database
    const query = 'UPDATE Event SET name = ?, date = ?, time = ?, venue = ?, description = ? WHERE event_id = ?';
    const values = [eventName, eventDate, eventTime, eventVenue, eventDescription, eventId];

    // Execute the query
    connection.query(query, values, (error, results, fields) => {
        if (error) {
            console.error('Error updating event:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log('Event updated successfully:', results);

            // Fetch the updated event details
            const eventDetailsQuery = 'SELECT * FROM Event WHERE event_id = ?';
            connection.query(eventDetailsQuery, [eventId], (error, eventDetails, fields) => {
                if (error) {
                    console.error('Error retrieving updated event details:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    if (eventDetails.length > 0) {
                        const updatedEvent = {
                            id: eventDetails[0].event_id,
                            name: eventDetails[0].name,
                            date: eventDetails[0].date,
                            time: eventDetails[0].time,
                            venue: eventDetails[0].venue,
                            description: eventDetails[0].description,
                            // Add more properties as needed
                        };

                        res.status(200).json({ success: true, updatedEvent });
                    } else {
                        res.status(404).json({ error: 'Event not found' });
                    }
                }
            });
        }
    });
});


module.exports = router;