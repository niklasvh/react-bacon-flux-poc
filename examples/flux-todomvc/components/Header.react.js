var React = require('react');
var TodoTextInput = require('./TodoTextInput.react');
var StoreMixin = require('../../../lib/store.mixin');

var Header = React.createClass({
    mixins: [StoreMixin],
    render: function() {
        return (
            <header id="header">
                <h1>todos</h1>
                <TodoTextInput id="new-todo" placeholder="What needs to be done?" onSave={this.getActions().todo.create.emit} />
            </header>
        );
    }
});

module.exports = Header;
