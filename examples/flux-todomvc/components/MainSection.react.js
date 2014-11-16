var React = require('react');
var TodoItem = require('./TodoItem.react');
var StoreMixin = require('../../../lib/store.mixin');

var MainSection = React.createClass({
    mixins: [StoreMixin],
    propTypes: {
        allTodos: React.PropTypes.array.isRequired,
        filteredTodos: React.PropTypes.array.isRequired,
        areAllComplete: React.PropTypes.bool.isRequired
    },
    render: function() {
        var todos = this.props.filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />);

        return (
            this.props.allTodos.length === 0 ? null : <section id="main">
                <input id="toggle-all" type="checkbox" onChange={this._onToggleCompleteAll} checked={this.props.areAllComplete ? 'checked' : ''}/>
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul id="todo-list">{todos}</ul>
            </section>
        );
    },
    _onToggleCompleteAll: function() {
        this.getActions().todo.toggleCompleteAll.emit();
    }
});

module.exports = MainSection;
