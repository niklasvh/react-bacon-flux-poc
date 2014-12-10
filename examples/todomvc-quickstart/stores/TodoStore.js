var Immutable = require('immutable');
var Bacon = require('baconjs');
var Constants = require('../constants/AppConstants');
var actions = {
    todo: require('../actions/TodoActions')
};

var create = text => Immutable.Map({
    id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
    complete: false,
    text: text
});

var nonEmpty = text => text.trim().length > 0;
var isComplete = todo => todo.get('complete');
var toJS = todos => todos.toList().toJS();
var applyModification = (todos, modification) => modification(todos);

var todos = Bacon.update(
    Immutable.OrderedMap(),
    actions.todo.create.filter(nonEmpty).map(create), (todos, todo) => todos.set(todo.get('id'), todo),
    actions.todo.destroy, (todos, todo) => todos.delete(todo.id),
    actions.todo.updateText, (todos, todo) => todos.setIn([todo.id, "text"], todo.text),
    actions.todo.toggleComplete, (todos, todo) => todos.setIn([todo.id, "complete"], !todo.complete),
    actions.todo.toggleCompleteAll, (todos) => todos.map(todo => todo.set('complete', true)),
    actions.todo.destroyCompleted, (todos) => todos.filterNot(isComplete)
);

var currentFilter = actions.todo.setFilter.toProperty(Constants.FILTER_ALL);
var todoFilter = currentFilter.map(filter => {
    switch(filter) {
        case Constants.FILTER_ACTIVE: return todos => todos.filterNot(isComplete);
        case Constants.FILTER_COMPLETE: return todos => todos.filter(isComplete);
        default: return todos => todos
    }
});

module.exports = {
    getAll: todos.map(toJS),
    getFiltered: todos.combine(todoFilter, applyModification).map(toJS),
    getFilter: currentFilter,
    allComplete: todos.map(todos => todos.every(todo => todo.get('complete')))
};
