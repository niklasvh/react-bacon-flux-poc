var Immutable = require('immutable');
var Bacon = require('baconjs');
var ChatMessageUtils = require('../utils/ChatMessageUtils');

var applyModification = (threads, modification) => modification(threads);
var getThread = (threads, id) => threads.get(id).toJS();
var createThread = message => new Immutable.Map({
        id: message.threadID,
        name: message.threadName,
        lastMessage: ChatMessageUtils.convertRawMessage(message, null)
    });

module.exports = function(actions) {
    var loadThreads =  actions.ChatMessage.getAllMessages
        .map(rawMessages => rawMessages.map(createThread))
        .map(rawThreads => threads => threads.merge(new Immutable.List(rawThreads).reduce(
            (map, value) => map.set(value.get('id'), value),
            new Immutable.Map()
        )));

    var markThreadAsRead = actions.ChatThread.clickThread.map(id => threads => threads.setIn([id, "lastMessage", "isRead"], true));
    var _threads = Bacon.mergeAll(loadThreads, markThreadAsRead).scan(Immutable.Map(), applyModification);

    var allChrono = _threads.map(threads => threads.sortBy(thread => thread.get('lastMessage').date));
    var _currentID = allChrono.take(1).flatMap(threads => actions.ChatThread.clickThread.toProperty(threads.last().get('id'))).toProperty();

    return {
        "get": id => getThread(_threads, _currentID),
        getAll: _threads.map(threads => threads.toJS()),
        getCurrentID: _currentID,
        getCurrent: _threads.combine(_currentID, getThread),
        getAllChrono: allChrono.map(threads => threads.toList().toJS()),
        getUnreadCount: _threads.map(threads => threads.count(thread => !thread.get('lastMessage').get('isRead')))
    };
};
