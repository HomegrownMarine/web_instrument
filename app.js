var express = require('express');
var http = require('http');
var path = require('path');

var console = require('console');

exports.load = function(server) {
    server.use('/instrument', express.static(path.join(__dirname, 'www')));

    return {url:'/instrument/', title:'Custom Instrument', priority: 5};
};