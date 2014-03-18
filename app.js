var express = require('express');
var http = require('http');
var path = require('path');

var debug = require('debug')('my-application');
var console = require('console');




exports.load = function(server) {
    server.use('/instrument', express.static(path.join(__dirname, 'www')));

    // server.use('/goto', require('less-middleware')(path.join(__dirname, 'www')));
};