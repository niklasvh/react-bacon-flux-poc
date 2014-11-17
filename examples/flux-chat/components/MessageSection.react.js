var MessageComposer = require('./MessageComposer.react');
var MessageListItem = require('./MessageListItem.react');
var React = require('react');
var StoreMixin = require('../../../lib/store.mixin');

var getMessageListItem = message => <MessageListItem key={message.id} message={message} />;

var MessageSection = React.createClass({
    mixins: [StoreMixin],

    stateFromStores: stores => ({
        messages: stores.Message.getAllForCurrentThread,
        thread: stores.Thread.getCurrent
    }),

    componentDidMount: function() {
        this._scrollToBottom();
    },

    render: function() {
        var messageListItems = this.state.messages.map(getMessageListItem);
        return (
            <div className="message-section">
                <h3 className="message-thread-heading">{this.state.thread.name}</h3>
                <ul className="message-list" ref="messageList">{messageListItems}</ul>
                <MessageComposer />
            </div>
        );
    },

    componentDidUpdate: function() {
        this._scrollToBottom();
    },

    _scrollToBottom: function() {
        var ul = this.refs.messageList.getDOMNode();
        ul.scrollTop = ul.scrollHeight;
    },

});

module.exports = MessageSection;
