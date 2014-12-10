var React = require('react');
var Bacon = require('baconjs');
var StoreMixin = require('../../../lib/store.mixin');
var push = Bacon.Bus.prototype.push;

var getSelected = options => [].slice.call(options, 0).filter(options => options.selected);
var getEventSelectedOptions = event => getSelected(event.target.options).map(target => target.value);

var Dropdown = React.createClass({
    mixins: [StoreMixin],

    statics: {
        dropdown: new Bacon.Bus()
    },

    stateFromStores: stores => ({history: stores.history}),

    _onChange(event) {
        Dropdown.dropdown.push(getEventSelectedOptions(event));
    },

    render: function() {
        return (
            <select style={{width: 200, height: 100}} onChange={this._onChange} value={this.state.history.dropdown} multiple>
                <option value="value1">Value 1</option>
                <option value="value2">Value 2</option>
                <option value="value3">Value 3</option>
                <option value="value4">Value 4</option>
                <option value="value5">Value 5</option>
                <option value="value6">Value 6</option>
                <option value="value7">Value 7</option>
                <option value="value8">Value 8</option>
            </select>
        );
    }
});

module.exports = Dropdown;
