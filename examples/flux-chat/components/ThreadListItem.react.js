var React = require('react');
var cx = require('react/lib/cx');
var StoreMixin = require('../../../lib/store.mixin');

var ThreadListItem = React.createClass({
    mixins: [StoreMixin],

    propTypes: {
        thread: React.PropTypes.object,
        currentThreadID: React.PropTypes.string
    },

    render: function() {
        var thread = this.props.thread;
        var lastMessage = thread.lastMessage;
        return (
            <li
                className={cx({
                    'thread-list-item': true,
                    'active': thread.id === this.props.currentThreadID
                })}
                onClick={this._onClick}>
                <h5 className="thread-name">{thread.name}</h5>
                <div className="thread-time">{lastMessage.date.toLocaleTimeString()}</div>
                <div className="thread-last-message">{lastMessage.text}</div>
            </li>
        );
    },

    _onClick: function() {
        this.getActions().ChatThread.clickThread.emit(this.props.thread.id);
    }
});

module.exports = ThreadListItem;
