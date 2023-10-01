const express = require('express');
const mysql2 = require('mysql2');
const http = require('http');
const port = process.env.PORT || 3000;
const hostname = 'localhost';
const bodyParser = require('body-parser');

const conn = mysql2.createConnection({
    host: '127.0.0.1',
    user: 'jurij',
    password: 'lolypop123',
    database: 'covid19tracker'
});
conn.connect();

const app=express();

app.use(express.static(__dirname+'/src'));
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(__dirname+'/public/index.html');
});

app.listen(port);
console.log('Server on http://localhost:'+port);

app.post('http://127.0.0.1:3306/', (req, res)=>{
    console.log(res.body);
})