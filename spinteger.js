var express = require('express');
var app = express();
var path = require('path');
var url = require('url');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.set('port', process.env.PORT || 3003);

app.set('views', './views')
app.set('view engine', 'pug');

app.get('/', function(req,res){
    res.render('index');
});

app.get('/dist/spinteger.min.js', function(req,res){
    res.sendFile(path.join(__dirname, '/dist/spinteger.min.js'));
});

app.use(express.static(path.join(__dirname, '/build')));

app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
    console.log(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server error');
});

app.listen(app.get('port'), 'localhost', function(){
    console.log('go on port ' + app.get('port'));
});