var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
const mysql = require('mysql'),
    connection = require('express-myconnection'),
    config = {
        host: 'localhost',
        user: 'root',
        password: 'administrator',
        database: 'fishesavings',
        debug: false
    };

var app = express();
var server = http.Server(app);

//#region config
app.use(connection(mysql, config, 'request'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var MemoryStore = session.MemoryStore;
app.use(session({
    name: 'app.sid',
    secret: "secretfishe",
    resave: true,
    store: new MemoryStore(),
    saveUninitialized: true
}));
//#endregion

var rIndex = require('./routes/index');
var rAuth = require('./routes/OAuth');
var rAdmin = require('./routes/admin');

server.listen(process.env.port || 80);

app.use('/',rIndex);
app.use('/auth',rAuth);
app.use('/admin',rAdmin);