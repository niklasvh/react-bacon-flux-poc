var React = require('react');
var ReactPropTypes = React.PropTypes;
var Filter = require('./Filter.react');
var Constants = require('../constants/AppConstants');
var StoreMixin = require('../../../lib/store.mixin');

var Footer = React.createClass({
    mixins: [StoreMixin],
    propTypes: {
        allTodos: ReactPropTypes.array.isRequired,
        filter: ReactPropTypes.string.isRequired
    },
    render: function() {
        var allTodos = this.props.allTodos;
        var total = allTodos.length;

        var completed = allTodos.filter(todo => todo.complete).length;
        var itemsLeft = total - completed;
        var itemsLeftPhrase = (itemsLeft === 1 ? 'item' : 'items') + ' left';
        var clearCompletedButton = completed ? <button id="clear-completed" onClick={this._onClearCompletedClick}> Clear completed ({completed})</button> : null;

        return (
            total === 0 ? null : <footer id="footer">
                <span id="todo-count">
                    <strong>{itemsLeft}</strong> {itemsLeftPhrase}
                </span>
                <ul id="filters">
                    <Filter onUpdate={this.getActions().todo.setFilter.emit} filter={Constants.FILTER_ALL} active={this.props.filter === Constants.FILTER_ALL}>All</Filter>
                    <Filter onUpdate={this.getActions().todo.setFilter.emit} filter={Constants.FILTER_ACTIVE} active={this.props.filter === Constants.FILTER_ACTIVE}>Active</Filter>
                    <Filter onUpdate={this.getActions().todo.setFilter.emit} filter={Constants.FILTER_COMPLETE} active={this.props.filter === Constants.FILTER_COMPLETE}>Complete</Filter>
                </ul>
                {clearCompletedButton}
            </footer>
        );
    },
    _onClearCompletedClick: function() {
        this.getActions().todo.destroyCompleted.emit();
    }
});

module.exports = Footer;
