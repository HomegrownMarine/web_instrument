var express = require('express');
var http = require('http');
var path = require('path');

var debug = require('debug')('my-application');
var console = require('console');

var app = express();

app.use(express.static('www'));
app.use(require('less-middleware')({ src: path.join(__dirname, 'www') }));

// serve randomly changing data
var state = {'hdg': 123.0, 'speed':5.6};
app.get('/now', function(req, res){
	state.hdg+= parseInt((Math.random()/2.0-.25)*10)/10.0; 
	state.speed+= parseInt((Math.random()/2.0-.25)*10)/10.0; 

  	res.send(JSON.stringify(state));
});


app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.info('Express server listening on port ' + server.address().port);
    console.info(JSON.stringify(app.routes));
});




//TODO: mock out datasource on other port, or add mock route to root?
