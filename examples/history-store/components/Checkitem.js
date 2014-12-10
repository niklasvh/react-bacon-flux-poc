var React = require('react');
var Bacon = require('baconjs');
var StoreMixin = require('../../../lib/store.mixin');

var Checkitem = React.createClass({
    mixins: [StoreMixin],

    stateFromStores: stores => ({history: stores.history}),

    _onChange(event) {
        this.props.onChange(event.target.checked)
    },

    render: function() {
        return (
            <div>
                <label htmlFor={this.props.item}>{this.props.text}</label>
                <input
                    id={this.props.item}
                    type="checkbox"
                    onChange={this._onChange}
                    checked={this.state.history[this.props.item]}
                />
            </div>
        );
    }
});

module.exports = Checkitem;
