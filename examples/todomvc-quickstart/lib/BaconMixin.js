var Bacon = require('baconjs');
var invariant = require('react/lib/invariant');

var BaconMixin = {
    componentDidMount() {
        var component = this;
        this._streamTemplate = Bacon.combineTemplate(this.stateFromStores()).onValue(state => component.setState(state))
    },
    componentWillUnmount() {
        this._streamTemplate();
    },
    getInitialState() {
        invariant(
            typeof(this.stateFromStores) === "function",
            "BaconMixin requires the stateFromStores method to be defined for component " + this._currentElement.type.displayName
        );
        var tmp = null;
        Bacon.combineTemplate(this.stateFromStores()).onValue(value => tmp = value)();
        return tmp;
    }
};

module.exports = BaconMixin;
