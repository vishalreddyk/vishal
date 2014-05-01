var express = require("express");
var http = require('http');
var path = require('path');
var routes = require('routes');
var databaseUrl = "test"; // "username:password@example.com/mydb"
var collections = ["usercollection"]
var db = require("mongojs").connect(databaseUrl, collections);

var app= express();

// all environments
app.set('port',  8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(__dirname + '/public'));


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

app.route('/Hello')
    .all(function(req, res, next) {
        res.render('helloworld', { title: 'Hello, World!' });
    })
app.get('/', function(req, res){
    res.send('Welcome');
});

app.get('/User', function(req, res){

    db.usercollection.find({},{},function(e,docs) {
            res.render('Users', {
                "userlist": docs
            });
        });
    }
    );
