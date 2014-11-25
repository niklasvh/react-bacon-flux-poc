var React = require('react');
var Bacon = require('baconjs');
var StoreMixin = require('../../../lib/store.mixin');
var push = Bacon.Bus.prototype.push;

var Inputbox = React.createClass({
    mixins: [StoreMixin],

    statics: {
        text: new Bacon.Bus()
    },

    stateFromStores: stores => ({history: stores.history}),

    render: function() {
        return <input type="text" onChange={push.bind(Inputbox.text)} value={this.state.history.text} />;
    }
});

module.exports = Inputbox;
