const express = require('express');
const connection = require("../config/config");
const router = express.Router();

// Define a map to map province names to provinceId
const provinceIdMap = {
    'Free State': 1,
    'Gauteng': 2,
    'Kwazulu-Natal': 3,
    'Limpopo': 4,
    'Mpumalanga': 5,
    'North west': 6,
    'Western cape': 7,
    'Eastern cape': 8,
    'Northern Cape': 9,
};

router.post('/municipality', (req, res) => {
    const { municipality, province } = req.body;

    // Get the provinceId from the map
    const provinceId = provinceIdMap[province];

    if (provinceId === undefined) {
        res.status(400).json({ success: false, message: 'Invalid province name' });
        return;
    }

    // Assuming you have a table named 'municipalities' in your database
    const insertQuery = `INSERT INTO municipality (muni_name, province_id) VALUES (?, ?)`;

    connection.query(insertQuery, [municipality, provinceId], (error, results) => {
        if (error) {
            console.error('Error while inserting municipality data:', error);
            res.status(500).json({ success: false, message: 'Failed to insert municipality data' });
        } else {
            const muni_id = results.insertId;
            console.log('Municipality data inserted successfully');
            res.status(200).json({ success: true, message: 'Municipality data inserted successfully', insertedId: results.insertId });
        }
    });
});

router.post('/sampling_data', (req, res) => {
    const { userId, weatherCondition, muni_id } = req.body;
    const sampling_date_created = new Date();

    const insertQuery = `INSERT INTO samplingdata (userId, weatherCondition, sampling_date_created, muni_id) VALUES (?, ?, ?, ?)`;

    console.log("Insert Query:", insertQuery); // Log the SQL query for debugging

    connection.query(insertQuery, [userId, weatherCondition, sampling_date_created, muni_id], (err, result) => {
        if (err) {
            console.error('Error while inserting sampling data:', err);
            res.status(500).json({ success: false, message: 'Failed to insert sampling data', error: err.message });
        } else {
            const insertedId = result.insertId;
            console.log('Sampling data inserted successfully');
            res.status(200).json({ success: true, message: 'Sampling data recorded...', insertedId });
        }
    });
});

router.post("/watersource", (req, res) => {
    var watersourceSql = `insert into watersource(type,waterAccessability, samplingId)
    values(?,?,?)`
    var watersourceBody = [req.body.type, req.body.waterAccessability, req.body.samplingId]
    connection.query(watersourceSql, watersourceBody, (err, rows) => {
        if (err) throw err
        console.log("watersource", rows)
        res.send({message:"adedd watersource", rows})
    })
})

router.get("/maxId", (req, res) => {
    var idsql = 'SELECT MAX(samplingId) AS lastId FROM samplingdata'
    connection.query(idsql, (err, rows) => {
        if (err) throw err
        console.log("id", rows)
        res.send({message:"max id", rows})
    })
})

router.post("/province", (req, res) => {
    var provinceSql = `insert into province(province_name)
    values(?)`
    var provinceBody = [req.body.province_name]
    connection.query(provinceSql, provinceBody, (err, rows) => {
        if (err) throw err
        console.log("province", rows)
        res.send({message:"adedd province", rows})
    })
  })
  

router.post("/coordinates", (req, res) => {
    var coordinateSql = `insert into coordinate(longitude,latitude, samplingId)
    values(?,?,?)`
    var coordinateBody = [req.body.longitude, req.body.latitude, req.body.samplingId]
    connection.query(coordinateSql, coordinateBody, (err, rows) => {
        if (err) throw err
        console.log("coordinateBody", rows)
        res.send({message:"adedd coordinates", rows})
    })
})

router.post("/hydrogensulfide", (req, res) => {
    var risk_type=""
    if(req.body.status == "NEGATIVE"){risk_type = "Negative (No Risk)"}
    else{risk_type = "positive (Risk)"}
    var h2sSql = `insert into hydrogensulfide(status,risk_type, samplingId)
            values(?,?,?);`
    var h2sBody = [req.body.status, risk_type, req.body.samplingId]
    connection.query(h2sSql, h2sBody, (err, rows) => {
        if(err) throw err
        var status = req.body.status
        console.log("hydrogensulfide", status,risk_type)
        res.send({message:"adedd hydrogensulfide", status,risk_type, success:true})
    })
})

router.post('/sanitary_inspection_survey', (req, res) => {
    var total_avarage = 0
    var risk_type = ""
    if(req.body.pitLatrine == true){total_avarage = total_avarage+1}
    if(req.body.domesticAnimal == true){total_avarage = total_avarage+1}
    if(req.body.diaperDisposal == true){total_avarage = total_avarage+1}
    if(req.body.wasteWaterRelease == true){total_avarage = total_avarage+1}
    if(req.body.openDefaction == true){total_avarage = total_avarage+1}
    if(req.body.unprotectedWaterSource == true){total_avarage = total_avarage+1}
    if(req.body.agriculturalActivity == true){total_avarage = total_avarage+1}
    if(req.body.observerLaundryActivity == true){total_avarage = total_avarage+1}
    
    total_avarage = (total_avarage/8)*100
    
    if(total_avarage <26){risk_type ="low risk"}
    else if(total_avarage > 25 && total_avarage < 51){risk_type ="medium risk"}
    else if(total_avarage > 50 && total_avarage < 76){risk_type ="high risk"}
    else{risk_type ="very high risk"}
   
    var sql = `insert into sanitaryinpectionquestion(pitLatrine,domesticAnimal,diaperDisposal,wasteWaterRelease,openDefaction,
        unprotectedWaterSource,agriculturalActivity,observerLaundryActivity,samplingId,risk_type,total_avarage)
        VALUES(?,?,?,?,?,?,?,?,?,?,?)`
    var sanitaryRequests = [req.body.pitLatrine, req.body.domesticAnimal, req.body.diaperDisposal, req.body.wasteWaterRelease,
        req.body.openDefaction, req.body.unprotectedWaterSource, req.body.agriculturalActivity ,req.body.observerLaundryActivity, 
        req.body.samplingId, risk_type, total_avarage]
    connection.query(sql,sanitaryRequests,(err,results)=>{
        if(err) throw err
        if (results.affectedRows != 0) {
        console.log("sanitary survey", results)
        res.send({message:"adedd sanitary survey", total_avarage,risk_type, success:true})
        }
        else{
        res.send({message:"unable to add sanitary to database", success:false})

        }
    });
})






module.exports = router