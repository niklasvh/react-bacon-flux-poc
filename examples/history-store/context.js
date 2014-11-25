var HistoryStore = require('./store');

module.exports = function(Application) {
    var element = new Application();
    element._context.stores = HistoryStore();
    return element;
};
