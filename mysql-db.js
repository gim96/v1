const  { dbConfig } = require('./config.js');
const mysql = require('mysql');

var DBConnect = () => {

    var connectionConfigs = {
        host: 'localhost',
        user: 'gim',
        password: 'WMgim@96',
        database: 'test'
        // multipleStatements: true
    };

    var mysqlConnection = mysql.createConnection(connectionConfigs);

    mysqlConnection.connect((err)=> {
        if(!err) {
            console.log('Connection Established Successfully');
        } else console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
       

    });
};



module.exports = DBConnect();