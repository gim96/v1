const express = require('express')
// const { DBConnect } = require('./mysql-db.js');
const bodyparser = require('body-parser')
const mysql = require('mysql');
const cors = require('cors');

const app = express()
const port = 3000

app.use(cors());
app.use(bodyparser.json());


var connectionConfigs = {
    host: 'localhost',
    user: 'root',
    password: 'WMgim@96',
    database: 'test',
    port:'3306'
    // multipleStatements: true
};

var mysqlConnection = mysql.createConnection(connectionConfigs);

mysqlConnection.connect((err)=> {
    if(!err) {
        console.log('Connection Established Successfully');
    } else console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
   

});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
  

// ---------crud 

//*****************get all comments
app.get('/comments', (req, res) => {
  
    mysqlConnection.query('SELECT * FROM comments', (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
    })
    // res.send('Hello World!')
})

//*****************create a comment
app.post('/comments', (req, res) => {

    const name = JSON.stringify(req.body.name);
    const comment = JSON.stringify(req.body.comment);
    const date = JSON.stringify(req.body.date);

    if (name !== '' && comment !== '' && date !== '') {
        var sql = `INSERT INTO comments (name, comment, date) VALUES (${name}, ${comment}, ${date})`;
        mysqlConnection.query(sql, function (err, result) {
            if (err) throw err;
            res.send({message:"1 record inserted"});
        });
    }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})