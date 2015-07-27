var Immutable = require('immutable');
var Bacon = require('baconjs');
var ChatMessageUtils = require('../utils/ChatMessageUtils');

var getCreatedMessageData = (threadId, text) => {
    var timestamp = Date.now();
    return Immutable.Map({
        id: 'm_' + timestamp,
        threadID: threadId,
        authorName: 'Bill', // hard coded for the example
        date: new Date(timestamp),
        text: text,
        isRead: true
    });
};

var applyModification = (messages, modification) => modification(messages);
var getAllForThread = (messages, threadId) => messages.filter(message => message.get('threadID') === threadId)
    .toList().sortBy(message => message.get('date'));
var toJS = todos => todos.toList().toJS();

module.exports = function(actions, ThreadStore) {
    var createMessage = ThreadStore.getCurrentID
        .sampledBy(actions.ChatMessage.createMessage, getCreatedMessageData)
        .map(message => messages => messages.set(message.get('id'), message));

    var loadMessages = actions.ChatMessage.getAllMessages
        .combine(ThreadStore.getCurrentID, (rawMessages, threadId) => rawMessages.map(ChatMessageUtils.convertRawMessages(threadId)))
        .map(rawMessages => messages => messages.merge(new Immutable.List(rawMessages).reduce(
            (map, value) => map.set(value.get('id'), value),
            new Immutable.Map()
        )));

    var _messages = Bacon.mergeAll(createMessage, loadMessages).scan(Immutable.Map(), applyModification);

    return {
        getAllForThread: threadId => getAllForThread(_messages, threadId).map(toJS),
        getAllForCurrentThread: _messages.combine(ThreadStore.getCurrentID, getAllForThread).map(toJS)
    };
};
