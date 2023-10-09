const express = require('express');
const jquery= require('jquery');
const mysql2 = require('mysql2');
const http = require('http');
const port = process.env.PORT || 3000;
const hostname = 'localhost';
const bodyParser = require('body-parser');
const expressSession=require('express-session');

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
        secret: "123456789QWERTY", // Skrivni ključ za podpisovanje piškotov
        saveUninitialized: true, // Novo sejo shranimo
        resave: false, // Ne zahtevamo ponovnega shranjevanja
        cookie: {
          maxAge: 3600000, // Seja poteče po 1 h neaktivnosti
        },
}));

app.get('/', function(req, res){
    res.sendFile(__dirname+'/public/index.html');
});

app.post('/', (req, res)=>{
    var email=req.body.email;
    var passwd=req.body.password;
    var ime=req.body.ime;
    var priimek=req.body.priimek;
    var starost=req.body.starost;
    var id=genEhrID();
    if(!validEmail(email)||!validPasswd(passwd)||starost<14|| ime==""|| priimek==""){
        res.sendFile(__dirname+'/public/index.html');
        return;
    }

    var data=[id, email, passwd, ime, priimek, starost];
    
    /*var person = conn.query("SELECT * FROM login WHERE email='"+email+"'", (err, res, fields)=>{
        if(err) throw err;
        return res[0].email;
    });
    console.log(person);*/
    conn.query("SELECT * FROM login WHERE email='"+email+"'", (err, results)=>{
        if(err) throw err;
        if(results.length>0) res.sendFile(__dirname+'/public/index.html');
    });

    console.log("i get to here");
    
    conn.query("INSERT IGNORE INTO login (ehrId, email, passwd, ime, priimek, starost) VALUES (?,?,?,?,?,?)",
    data, (err, results)=>{
        if(err) throw err;
    });
    res.sendFile(__dirname+'/public/profile.html');
});

app.post('/profile', (req, res)=>{
    var email=req.body.emailLogin;
    var password=req.body.passwordLogin;

    conn.query("SELECT email, passwd FROM login WHERE email='"+email+"' AND passwd='"+password+"'", (err, results)=>{
        if(err) throw err; 
        console.log(results[0]);
        if(results.length>0){
            req.session.user={email, password};
            console.log(req.session);
            res.sendFile(__dirname+'/public/profile.html');
        }else{
            res.sendFile(__dirname+'/public/index.html');
        }
    });
});

/*app.get('/get-user-data', (req, res)=>{
    const mail=req.session.email;
    if(mail){
        res.json({email: mail});
    }else{
        res.status(404).json({error: 'User not authenticated'});
    }
});

/*app.get('/logout', (req, res)=> {
    req.session.destroy();
    res.sendFile(__dirname+"/public/index.html");
});*/

function genEhrID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

function validPasswd(password){ 
    let regex=/^[a-zA-Z]\w{3,14}$/;
    return regex.test(password);
}
function validEmail(email){
    let regex=/^\S+@\S+\.\S+$/;
    return regex.test(email);
}



app.listen(port);
console.log('Server on http://localhost:'+port);