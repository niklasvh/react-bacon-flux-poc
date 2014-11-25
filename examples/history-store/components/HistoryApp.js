var React = require('react');
var Bacon = require('baconjs');
var StoreMixin = require('../../../lib/store.mixin');
var Inputbox = require('./Inputbox');
var Checkitem = require('./Checkitem');
var Dropdown = require('./Dropdown');
var push = Bacon.Bus.prototype.push;

var HistoryApp = React.createClass({
    mixins: [StoreMixin],

    statics: {
        item1: new Bacon.Bus(),
        item2: new Bacon.Bus(),
        item3: new Bacon.Bus()
    },

    _back: () => history.back(),
    _forward: () => history.forward(),

    stateFromStores: stores => ({history: stores}),

    render: function() {
        return (
            <div>
                <h2>React with History API store</h2>
                <h3>(history size={this.state.history.size})</h3>
                <p>Perform actions on the page and watch the state of the page getting stored in browser history</p>
                <button onClick={this._back}>Back</button> <button onClick={this._forward}>Forward</button>
                <hr />
                <Inputbox />
                <hr />
                <Checkitem item="item1" text="Item 1" onChange={push.bind(HistoryApp.item1)} />
                <Checkitem item="item2" text="Item 2" onChange={push.bind(HistoryApp.item2)} />
                <Checkitem item="item3" text="Item 3" onChange={push.bind(HistoryApp.item3)} />
                <hr />
                <h4>Multi select</h4>
                <Dropdown />
            </div>
        );
    }
});

module.exports = HistoryApp;
