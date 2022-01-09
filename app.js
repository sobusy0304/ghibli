const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var data;
var app = express();

//create variable for api request
var xhr = new XMLHttpRequest();
//setup template
app.set('view engine', 'ejs')
//for css use
app.use(express.static('./assets'));

//open api source
xhr.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

xhr.onload = function () {
  data = JSON.parse(this.responseText)
  if (xhr.status >= 200 && xhr.status < 400) {
    data.forEach(imagelist => {
      console.log(imagelist.title);
    });
    data.forEach(movie => {
      console.log(movie.title);
    });
  }
  else {
    app.get('/404', function(req, res){
      res.render('404');
    })
  }
}
xhr.send();

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.get ('/', function(req, res){
  res.render('home', {imagelist: data});
});

app.get('/home', function(req, res){
    res.render('home', {imagelist: data});
});

app.get('/story', function(req, res){
    res.render('story', {movie: data});
});

app.get('/contact', function(req, res){
    res.render('contact', {qs: req.query});
});
app.post('/contact', urlencodedParser, function(req, res){
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    res.render('contact_done', {data: req.body});
});

app.get('/login', function(req, res){
  res.render('login');
});

app.get('/register', function(req, res){
  res.render('register');
});


//start application
//index(app);

//listening to port 3400
app.listen(3400);
