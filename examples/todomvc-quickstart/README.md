# Getting started

    git clone git@github.com:niklasvh/react-bacon-flux-poc.git
    cd react-bacon-flux-poc
    npm install
    npm start

## Actions (Bacon.Bus:es) available

`var actions = require('./actions/TodoActions');`

 - `actions.create.push(text: string)`: Create new todo with text
 - `actions.updateText.push({id: string, text: string})`: Update todo with text
 - `actions.toggleComplete.push(todo : {id: string, complete: boolean})`: Toggle todo's complete state
 - `actions.toggleCompleteAll.push()`: Toggle all todos to complete
 - `actions.destroy.push(todo : {id: string})`:  Destroy todo with given id
 - `actions.destroyCompleted.push()`: Destroy all todos marked complete
 - `actions.setFilter.push(filter: string)`: Set current filter to string

## Store Bacon streams:

`var store = require('./stores/TodoStore');`

 - `getAll`: Array of all todos
 - `getFiltered`: Array of todos matching current filter
 - `getFilter`: Current filter type (string)
 - `allComplete`: Current todos marked complete

## Functionality
[full spec](https://github.com/tastejs/todomvc/blob/master/app-spec.md)

### No todos

When there are no todos, `#main` and `#footer` should be hidden.

### New todo

New todos are entered in the input at the top of the app. The input element should be focused when the page is loaded preferably using the `autofocus` input attribute. Pressing Enter creates the todo, appends it to the todo list and clears the input. Make sure to `.trim()` the input and then check that it's not empty before creating a new todo.

### Mark all as complete

This checkbox toggles all the todos to the same state as itself. Make sure to clear the checked state after the the "Clear completed" button is clicked. The "Mark all as complete" checkbox should also be updated when single todo items are checked/unchecked. Eg. When all the todos are checked it should also get checked.

### Item

A todo item has three possible interactions:

1. Clicking the checkbox marks the todo as complete by updating its `completed` value and toggling the class `completed` on its parent `<li>`

2. Double-clicking the `<label>` activates editing mode, by toggling the `.editing` class on its `<li>`

3. Hovering over the todo shows the remove button (`.destroy`)

### Editing

When editing mode is activated it will hide the other controls and bring forward an input that contains the todo title, which should be focused (`.focus()`). The edit should be saved on both blur and enter, and the `editing` class should be removed. Make sure to `.trim()` the input and then check that it's not empty. If it's empty the todo should instead be destroyed. If escape is pressed during the edit, the edit state should be left and any changes be discarded.

### Counter

Displays the number of active todos in a pluralized form. Make sure the number is wrapped by a `<strong>` tag. Also make sure to pluralize the `item` word correctly: `0 items`, `1 item`, `2 items`. Example: **2** items left

### Clear completed button

Displays the number of completed todos, and when clicked, removes them. Should be hidden when there are no completed todos.
