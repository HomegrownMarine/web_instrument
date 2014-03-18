
var express = require('express');

var server = express();
server.use(express.urlencoded());

// serve randomly changing data
// serve randomly changing data
var state = {'hdg': 123.0, 'speed':5.6};
server.get('/now', function(req, res){
    state.hdg+= parseInt((Math.random()/2.0-.25)*10)/10.0; 
    state.speed+= parseInt((Math.random()/2.0-.25)*10)/10.0; 

    res.send(JSON.stringify(state));
});

server.get('/lib/jquery.js', function(req, res){
    res.redirect('http://code.jquery.com/jquery-2.1.0.min.js');
});
server.get('/lib/underscore.js', function(req, res){
    res.redirect('http://underscorejs.org/underscore.js');
});
server.get('/lib/backbone.js', function(req, res){
    res.redirect('http://backbonejs.org/backbone.js');
});

//

server.set('port', process.env.PORT || 3000);

require('./app').load( server )

var server = server.listen(server.get('port'), function() {
    console.info('Express server listening on port ' + server.address().port);
    console.info(JSON.stringify(server.routes));
});