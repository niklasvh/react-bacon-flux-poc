var express = require('express');
var React = require('react');
require('node-jsx').install();
var App = React.createFactory(require('./client'));
var Bacon = require('baconjs');

var port = 8080;
var server = express();

var app = App({a: 'b', context: 'c'});
app._context = {lol: 'a'};

console.log(app);


console.log(React.renderToString(app));



server.use(function (req, res, next) {

    res.send(200);
});

server.listen(port);
console.log("Server running on port", port);

/*
function BaconAction(handler) {
    this._emitHandler = handler;
    this._currentValue = null;
    this.sink = null;
    Bacon.EventStream.call(this, "BaconAction", this.subscribeAll.bind(this));
}


BaconAction.prototype = Object.create(Bacon.EventStream.prototype);
BaconAction.prototype.emit = function() {
    this._emitHandler.apply(this, arguments);
};

BaconAction.prototype.subscribeAll = function() {
    console.log('subscribeAll', arguments);
    return this.unsubAll;
};

BaconAction.prototype.unsubAll = function() {
    this.subscriptions.forEach(function(subscriber) {
        if (typeof subscriber.unsub === "function") {
            subscriber.unsub();
        }
    });
};

BaconAction.prototype.guardedSink = function(input) {
    return (function(_this) {
        return function(event) {
            if (event.isEnd()) {
                _this.unsubscribeInput(input);
                return Bacon.noMore;
            } else {
                return _this.sink(event);
            }
        };
    })(this);
};

BaconAction.prototype.push = function(value) {
    return typeof this.sink === "function" ? this.sink(Bacon.next(value)) : void 0;
};
*/

function BaconAction(handler) {
    this._emitHandler = handler;
    this._currentValue = null;
    Bacon.Bus.call(this);
}

BaconAction.prototype = Object.create(Bacon.Bus.prototype);
BaconAction.prototype.emit = function() {
    this._emitHandler.apply(this, arguments);
};

BaconAction.prototype.constructor = BaconAction;

var action = new BaconAction(function(text, thing) {
    this.push({text: text, thing: thing});
});

action.log();

action.emit("item", "lol");
