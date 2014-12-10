var React = require('react/addons');
var actions = require('./actions/TodoActions');
var store = require('./stores/TodoStore');

var App = React.createClass({
    render() {
        return (
            <div />
        );
    }
});

module.exports = App;

if (typeof window !== 'undefined') {
    React.render(<App />, document.querySelector("#todoapp"));
    window.React = React; // export for http://fb.me/react-devtools
    window.Perf = React.addons.Perf;
    window.actions = actions;
    window.store = store;
}
