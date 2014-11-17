var MessageStore = require('./stores/MessageStore');
var ThreadStore = require('./stores/ThreadStore');
var ChatMessageActions = require('./actions/ChatMessageActions');
var ChatThreadActionCreators = require('./actions/ChatThreadActionCreators');

module.exports = function(Application) {
    var element = new Application();

    var actions = {
        ChatMessage: ChatMessageActions(),
        ChatThread: ChatThreadActionCreators()
    };

    var thread = ThreadStore(actions);
    var message = MessageStore(actions, thread);
    var stores = {
        Thread: thread,
        Message: message
    };

    element._context.stores = stores;
    element._context.actions = actions;
    return element;
};
