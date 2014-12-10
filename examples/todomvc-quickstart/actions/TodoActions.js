var Bacon = require('baconjs');

module.exports = {
    /**
     * Create a new ToDo item
     * @param  {string} text for new todo item
     */
    create: new Bacon.Bus(),

    /**
     * @param  {string} id The ID of the ToDo item
     * @param  {string} text
     */
    updateText: new Bacon.Bus(),

    /**
     * Toggle whether a single ToDo is complete
     * @param  {object} todo
     */
    toggleComplete: new Bacon.Bus(),

    /**
     * Mark all ToDos as complete
     */
    toggleCompleteAll: new Bacon.Bus(),

    /**
     * Destroy a single ToDo
     * @param  {object} todo
     */
    destroy: new Bacon.Bus(),

    /**
     * Delete all the completed ToDos
     */
    destroyCompleted: new Bacon.Bus(),

    setFilter:  new Bacon.Bus()
};
