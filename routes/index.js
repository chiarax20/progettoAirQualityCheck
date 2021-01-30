var express = require('express');
var router = express.Router();
let mysql  = require('mysql');
let config = require('../modules/config.js');
let connection = mysql.createConnection(config);
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
router.use(cookieParser());


router.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node.js App' });
});

router.post('/', function(req, res, next) {
  if (req.session.loggedin) {
    req.session.loggedin = false;
  }
  res.render('index', { title: 'Node.js App' });
});

/* REGISTRAZIONE */ 
router.get('/registrazione', function(req, res, next) {
  res.render('registrazione', { title: 'Node.js App'});
});

router.post('/registrazione', function(req, res, next) {
  var name = req.body.name;
  var password = req.body.password;
  var email = req.body.email;
  var ripetipassword = req.body.ripetipassword;
  let sql1 = `SELECT id FROM users WHERE email = '${req.body.email}'`;
  let sql2 = `INSERT INTO users(name,email,password) VALUES('${name}','${email}','${password}')`;
  connection.query(sql1,(err, results, fields) => {
    if(results.length>0) {
      res.send ('La mail inserita già esiste');
    }else {
      if(password != ripetipassword ){
        res.send("Le password inserite non coincidono");
      }else{
        req.session.loggedin = true;
        req.session.name = name;
        connection.query(sql2,(err, results, fields) => {
          console.log(results);
          let utente = { 
            name : name, 
            id :  results.insertId,
            email :email
            } 
          res.cookie("userData", utente); 
          res.render('account', { title: 'Node.js App', utente:name, mail:email});
        })
      }
    }
  });
});

/* LOGIN */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Node.js App' });
});


/* RISULTATI */
router.get('/risultati/', function(req, res, next) {
  let sql1 = `SELECT * FROM localita`;
  connection.query(sql1,(err, results, fields) => {
    res.render('risultati', { title: 'Node.js App', segnalazioni:results});
    console.log(results);
  });
});

router.post('/risultati', function(req, res, next) {
  let sql1 = `SELECT * FROM localita`;
  connection.query(sql1,(err, results, fields) => {
    res.render('risultati', { title: 'Node.js App', segnalazioni:results});
    console.log(results);
  });
});

/* RISULTATI PER REGIONE */

router.get('/risultati/:regione', function(req, res, next) {
  let regione = req.params.regione;
  let sql1 = `SELECT * FROM localita WHERE regione = '${regione}'`;
  connection.query(sql1,(err, results, fields) => {
    res.render('risultati', { title: 'Node.js App', segnalazioni:results});
    console.log(results);
  });
});

router.post('/risultati/:regione', function(req, res, next) {
  let regione = req.params.regione;
  console.log(regione);
  let sql1 = `SELECT * FROM localita WHERE regione = '${regione}'`;
  connection.query(sql1,(err, results, fields) => {
    res.render('risultati', { title: 'Node.js App', segnalazioni:results});
    console.log(results);
  });
});

module.exports = router;