const express = require('express');
const mysql2 = require('mysql2');
const http = require('http');
const port = process.env.PORT || 3000;
const hostname = 'localhost';

const app=express();

app.use(express.static(__dirname+'/src'));
app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname+'/public/index.html');
});

app.listen(port);
console.log('Server on http://localhost:'+port);
