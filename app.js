require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Connection = require('./config/config')

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', require('./routes/user')) // 
app.use('/api', require('./routes/refPathogen'))
app.use('/api', require('./routes/level1'))
app.use('/api', require('./routes/regsitration'))
app.use('/api', require('./routes/File'));
app.use('/api', require('./routes/H2SReport'));
app.use('/api', require('./routes/FIBdata'));
app.use('/api', require('./routes/QMRAFile'));
app.use('/api', require('./routes/parameters'));
app.use('/api', require('./routes/multipleExposure'));
app.use('/api', require('./routes/MST'));
app.use('/api', require('./routes/RefPathogenMST'));
app.use('/api', require('./routes/mstPathogen'));
app.use('/api', require('./routes/QMRA3'));
app.use('/api', require('./routes/likelyhood'));
app.use('/api', require('./routes/pathoLikely'));
app.use('/api', require('./routes/admin'));
app.use('/api', require('./routes/Adminn'));
app.use('/api', require('./routes/message'));
app.use('/api', require('./routes/Allusers'));
app.use('/api', require('./routes/download'));


app.use('/', (req, res) =>{
    res.send('Endpoint')
})


app.listen(process.env.PORT, () => {
    console.log('Server started at port ' + process.env.PORT)
})