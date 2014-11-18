var Immutable = require('immutable');
var Bacon = require('baconjs');
var Constants = require('../constants/AppConstants');

var create = text => Immutable.Map({
    id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
    complete: false,
    text: text
});

var isComplete = todo => todo.get('complete');
var toJS = todos => todos.toList().toJS();
var applyModification = (todos, modification) => modification(todos);

module.exports = function(actions) {
    var createTodo = actions.todo.create.map(create).map(todo => todos => todos.set(todo.get('id'), todo));
    var destroyTodo = actions.todo.destroy.map(id => todos => todos.delete(id));
    var updateText = actions.todo.updateText.map(todo => todos => todos.setIn([todo.id, "text"], todo.text));
    var updateComplete = actions.todo.toggleComplete.map(todo => todos => todos.setIn([todo.id, "complete"], todo.complete));
    var updateAllComplete = actions.todo.toggleCompleteAll.map(() => todos => todos.map(todo => todo.set('complete', true)));
    var destroyCompleted = actions.todo.destroyCompleted.map(() => todos => todos.filterNot(isComplete));

    var todos = Bacon.mergeAll(createTodo, destroyTodo, updateText, updateComplete, updateAllComplete, destroyCompleted)
        .scan(Immutable.OrderedMap(), applyModification);

    var currentFilter = actions.todo.setFilter.toProperty(Constants.FILTER_ALL);
    var todoFilter = currentFilter.map(filter => {
        switch(filter) {
            case Constants.FILTER_ACTIVE: return todos => todos.filterNot(isComplete);
            case Constants.FILTER_COMPLETE: return todos => todos.filter(isComplete);
            default: return todos => todos
        }
    });

    return {
        getAll: todos.map(toJS),
        getFiltered: todos.combine(todoFilter, applyModification).map(toJS),
        getFilter: currentFilter,
        allComplete: todos.map(todos => todos.every(todo => todo.get('complete')))
    };
};
