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

var isChecked = event => event.target.checked;
var getSelected = options => [].slice.call(options, 0).filter(options => options.selected);
var getEventSelectedOptions = event => getSelected(event.target.options).map(target => target.value);

module.exports = function() {
    var text = Inputbox.text.map(event => event.target.value).skipDuplicates();
    var dropdown = Dropdown.dropdown.map(getEventSelectedOptions).skipDuplicates();

    var popStream = hasHistory ? Bacon.fromEventTarget(window, "popstate", event => event.state)
        .filter(value => !!value) : Bacon.never();

    var historyStream = Bacon.combineTemplate({
        text: text.toProperty("Initial value"),
        item1: HistoryApp.item1.map(isChecked).toProperty(false),
        item2: HistoryApp.item2.map(isChecked).toProperty(true),
        item3: HistoryApp.item3.map(isChecked).toProperty(false),
        dropdown: dropdown.toProperty(["value2"])
    }).doAction(pushState).flatMapLatest(state => popStream.toProperty(state));

    return {
        history: historyStream,
        size: historyStream.map(() => hasHistory ? history.length: 0).toProperty(0)
    }
};
