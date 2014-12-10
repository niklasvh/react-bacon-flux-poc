var React = require('react');
var TodoTextInput = require('./TodoTextInput.react');
var StoreMixin = require('../../../lib/store.mixin');

var Header = React.createClass({
    mixins: [StoreMixin],
    _create(text) {
        this.getActions().todo.create.push(text);
    },
    render() {
        return (
            <header id="header">
                <h1>todos</h1>
                <TodoTextInput id="new-todo" placeholder="What needs to be done?" onSave={this._create} />
            </header>
        );
    }
});

module.exports = Header;
