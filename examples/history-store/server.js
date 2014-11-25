var development = process.env.NODE_ENV !== 'production';
var express = require('express');
var React = require('react');
var path = require('path');
var browserify = require('connect-browserify');
var Bacon = require('baconjs');
require('node-jsx').install({harmony: true});
var Context = require('./context');

var port = 8080;
var server = express();
var Application = React.createFactory(require('./client'));

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

server.get('/', function(req, res) {
    res.send(React.renderToString(Context(Application)));
});

server.listen(port);
console.log("Server running on port", port);
