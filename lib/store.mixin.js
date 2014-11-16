var React = require('react');
var Bacon = require('baconjs');
var invariant = require('react/lib/invariant');

var StoreMixin = {
    contextTypes: {
        stores: React.PropTypes.object,
        actions: React.PropTypes.object
    },
    childContextTypes: {
        stores: React.PropTypes.object,
        actions: React.PropTypes.object
    },
    getChildContext: function() {
        return this.context;
    },
    getInitialState: function() {
        this._streamTemplate = (typeof(this.stateFromStores) === "function") ? Bacon.combineTemplate(this.stateFromStores(this.context.stores)) : null;
        var tmp = null;
        if (this._streamTemplate) {
            this._streamTemplate.onValue(function(value) {
                tmp = value;
            })();
        }
        return tmp;
    },
    getActions: function() {
        return this.context.actions;
    },
    componentDidMount: function() {
        if (this._streamTemplate) {
            this._streamTemplate.onValue(function(state) {
                this.setState(state);
            }.bind(this));
        }
    },
    componentWillUnmount: function() {
        if (this._streamTemplate) {
            console.log('unmount');
        }
    }
};

module.exports = StoreMixin;
