var React = require('react');
//var MessageStore = require('../stores/MessageStore');
var ThreadListItem = require('../components/ThreadListItem.react');
var StoreMixin = require('../../../lib/store.mixin');
//var ThreadStore = require('../stores/ThreadStore');
//var UnreadThreadStore = require('../stores/UnreadThreadStore');

function getStateFromStores() {
    return {
        threads: ThreadStore.getAllChrono(),
        currentThreadID: ThreadStore.getCurrentID(),
        unreadCount: UnreadThreadStore.getCount()
    };
}

var ThreadSection = React.createClass({
    mixins: [StoreMixin],

    stateFromStores: stores => ({
        threads: stores.Thread.getAllChrono,
        currentThreadID: stores.Thread.getCurrentID,
        unreadCount: stores.Thread.getUnreadCount
    }),

    render: function() {
        var threadListItems = this.state.threads.map(function(thread) {
            return <ThreadListItem key={thread.id} thread={thread} currentThreadID={this.state.currentThreadID} />;
        }, this);
        var unread = this.state.unreadCount === 0 ? null : <span>Unread threads: {this.state.unreadCount}</span>;

        return (
            <div className="thread-section">
                <div className="thread-count">{unread}</div>
                <ul className="thread-list">{threadListItems}</ul>
            </div>
        );
    }
});

module.exports = ThreadSection;
