var React = require('react');
var Bacon = require('baconjs');
var StoreMixin = require('../../../lib/store.mixin');

var Inputbox = React.createClass({
    mixins: [StoreMixin],

    statics: {
        text: new Bacon.Bus()
    },

    _onChange(event) {
        Inputbox.text.push(event.target.value);
    },

    stateFromStores: stores => ({history: stores.history}),

    render: function() {
        return <input type="text" onChange={this._onChange} value={this.state.history.text} />;
    }
});

module.exports = Inputbox;
