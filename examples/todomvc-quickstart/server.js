var development = process.env.NODE_ENV !== 'production';
var express = require('express');
var React = require('react');
var path = require('path');
var browserify = require('connect-browserify');
var Bacon = require('baconjs');
require('node-jsx').install({harmony: true});

var port = 8081;
var server = express();

server.disable('x-powered-by');

if (development) {
    server.get('/app.js', browserify({
        entry: path.resolve(__dirname, './client'),
        debug: false,
        watch: true
    }));
} else {
    server.get('/app.js', function(req, res) {
        res.sendfile(path.resolve(__dirname, './app.js'));
    });
}

server.use('/todomvc-common', express.static(__dirname + '/todomvc-common'));

server.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

server.listen(port);
console.log("Server running on port", port);
