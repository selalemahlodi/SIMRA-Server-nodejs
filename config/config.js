var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'sql8.freemysqlhosting.net',
    user: 'sql8681808',
    password: 'gkldz95Xkt',
    database: 'sql8681808',
    port : '3306'
});



connection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

module.exports=connection;