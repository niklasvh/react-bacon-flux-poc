var Bacon = require('baconjs');
var BaconAction = require('../../../lib/bacon-action');

module.exports = function() {
    return {
        /**
         * @param  {string} text
         */
        create: new BaconAction(function(text) {
            if (text.trim()) {
                this.push(text);
            }
        }),

        /**
         * @param  {string} id The ID of the ToDo item
         * @param  {string} text
         */
        updateText: new BaconAction(function(id, text) {
            this.push({id: id, text: text});
        }),

        /**
         * Toggle whether a single ToDo is complete
         * @param  {object} todo
         */
        toggleComplete: new BaconAction(function(todo) {
            var id = todo.id;
            this.push({id: id, complete: !todo.complete});
        }),
        /**
         * Mark all ToDos as complete
         */

        toggleCompleteAll: new BaconAction(),

        /**
         * @param  {string} id
         */

        destroy: new BaconAction(),

        /**
         * Delete all the completed ToDos
         */
        destroyCompleted: new BaconAction(),

        setFilter:  new BaconAction()
    };
};
