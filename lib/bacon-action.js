var Bacon = require('baconjs');

function BaconAction(handler) {
    this._emitHandler = typeof(handler) === "function" ? handler : function(value) {
        this.push(value);
    };
    Bacon.Bus.call(this);
    this.emit = function() {
        (typeof(handler) === "function" ? handler : function(value) { this.push(value); }).apply(this, arguments);
    }.bind(this);
}

BaconAction.prototype = Object.create(Bacon.Bus.prototype);

BaconAction.prototype.constructor = BaconAction;

module.exports = BaconAction;
