var express = require('express');
var router = express.Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './public/images/uploads' })
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


/* LOGIN in Post */ 
router.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  if (email && password) {
    let sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    connection.query(sql,(err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }else if(results.length>0){
        console.log(results);
        req.session.loggedin = true;
        req.session.name = results[0].name;
        let utente = { 
          name : results[0].name, 
          id :  results[0].id,
          email :email
          } 
        res.cookie("userData", utente); 
        return res.render('account', { title: 'Node.js App', utente:results[0].name, mail:email });
      }else {
        console.log(results);
        return res.send("Username o password non validi")
      } 
    });
  } else {
    return res.send('Per favore inserisci Username e Password!') 
  }
});

/* UPLOAD */
router.post('/upload', multipartMiddleware , function(req, res, next) {
  if (req.session.loggedin) {
    var path = req.files.filetoupload.path;
    var pathimage= path.replace('public\\images\\uploads\\', '');
    var sql1=`INSERT INTO localita (regione,citta,via,civico,cap,user,path) VALUES('${req.body.regione}','${req.body.citta}','${req.body.via}','${req.body.civico}','${req.body.cap}', '${req.cookies.userData.id}','${pathimage}' )`;
    connection.query(sql1,(err, results, fields) => {
      return res.render('upload', { title: 'Node.js App', fileName:req.files.filetoupload.name});
    });
  }else {
    return  res.send('Please login to view this page!');
  }
});

router.get('/upload', multipartMiddleware , function(req, res, next) {
  if (req.session.loggedin) {
    return res.render('upload');
  }else {
    return res.send('Per favore effettua il login per visualizzare questa pagina!');
  }
});

/*PAGINA ACCOUNT */ 
router.get('/', function(req, res, next) {
  if (req.session.loggedin) {
    return res.render('account', { title: 'Node.js App', utente:req.cookies.userData.name, mail:req.cookies.userData.email });
  }else{
    res.send('Effettua il login per vedere questa sezione');
  }
});

router.post('/', function(req, res, next) {
  if (req.session.loggedin) {
    let sql1 = `SELECT * FROM localita WHERE user ='${req.cookies.userData.id}'`;
    connection.query(sql1,(err, results, fields) => {
      res.render('account', { title: 'Node.js App', utente:req.cookies.userData.name, mail:req.cookies.userData.email, segnalazioni:results });
      console.log(results);
    });
  }else{
    res.send('Effettua il login per vedere questa sezione');
  }
});

module.exports = router;