var Immutable = require('immutable');
var Bacon = require('baconjs');
var Inputbox = require('./components/Inputbox');
var Dropdown = require('./components/Dropdown');
var HistoryApp = require('./components/HistoryApp');

var hasHistory = typeof(history) !== "undefined";

var pushState = (state) => {
    if (hasHistory) {
        history.pushState(state, "", "/");
    }
};

module.exports = function() {
    var popStream = hasHistory ? Bacon.fromEventTarget(window, "popstate", event => event.state)
        .filter(value => !!value) : Bacon.never();

    var historyStream = Bacon.update(
        Immutable.Map({
            text: "Initial value",
            item1: false,
            item2: true,
            item3: false,
            dropdown: ["value2"]
        }),
        popStream, (store, state) => Immutable.Map(state),
        Inputbox.text, (store, text) => store.set("text", text),
        HistoryApp.item1, (store, state) => store.set("item1", state),
        HistoryApp.item2, (store, state) => store.set("item2", state),
        HistoryApp.item3, (store, state) => store.set("item3", state),
        Dropdown.dropdown, (store, state) => store.set("dropdown", state)
    ).map(store => store.toJS());

    historyStream.sampledBy(Bacon.mergeAll([
        Inputbox.text,
        HistoryApp.item1,
        HistoryApp.item2,
        HistoryApp.item3,
        Dropdown.dropdown
    ])).onValue(pushState);

    return {
        history: historyStream,
        size: historyStream.map(() => hasHistory ? history.length: 0).changes().toProperty(0)
    };
};
