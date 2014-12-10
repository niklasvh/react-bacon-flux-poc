var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoTextInput = require('./TodoTextInput.react');
var StoreMixin = require('../../../lib/store.mixin');

var cx = require('react/lib/cx');

var TodoItem = React.createClass({
    mixins: [StoreMixin],
    propTypes: {
        todo: ReactPropTypes.object.isRequired
    },
    getInitialState: () => ({isEditing: false}),
    render: function() {
        var todo = this.props.todo;
        var input = (this.state.isEditing) ? <TodoTextInput className="edit" onSave={this._onSave} value={todo.text} /> : null;

        return (
            <li className={cx({'completed': todo.complete, 'editing': this.state.isEditing})} key={todo.id}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={todo.complete} onChange={this._onToggleComplete} />
                    <label onDoubleClick={this._onDoubleClick}>
                        {todo.text}
                    </label>
                    <button className="destroy" onClick={this._onDestroyClick} />
                </div>
                {input}
            </li>
        );
    },
    _onToggleComplete: function() {
        this.getActions().todo.toggleComplete.push(this.props.todo);
    },
    _onDoubleClick: function() {
        this.setState({isEditing: true});
    },
    _onSave: function(text) {
        this.getActions().todo.updateText.push({id: this.props.todo.id, text: text});
        this.setState({isEditing: false});
    },
    _onDestroyClick: function() {
        this.getActions().todo.destroy.push(this.props.todo);
    }
});

module.exports = TodoItem;
