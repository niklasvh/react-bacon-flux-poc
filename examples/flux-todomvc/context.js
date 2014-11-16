var TodoStore = require('./stores/TodoStore');
var TodoActions = require('./actions/TodoActions');

module.exports = function(Application) {
    var element = new Application();

    var actions = {
        todo: TodoActions()
    };

    var stores = {
        todo: TodoStore(actions)
    };

    element._context.stores = stores;
    element._context.actions = actions;
    return element;
};
