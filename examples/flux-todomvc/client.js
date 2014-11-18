var React = require('react');
var TodoApp = require('./components/TodoApp.react');
var StoreMixin = require('../../lib/store.mixin');
var Context = require('./context');

var App = React.createClass({
    mixins: [StoreMixin],
    render: function() {
        return (
            <html lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <title>Flux • TodoMVC</title>
                    <link rel="stylesheet" href="todomvc-common/base.css" />
                </head>
                <TodoApp />
                <footer id="info">
                    <p>Double-click to edit a todo</p>
                    <p>Created by <a href="https://github.com/niklasvh">Niklas von Hertzen</a>, based on implementation by <a href="http://facebook.com/bill.fisher.771">Bill Fisher</a></p>
                    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                </footer>
                <script src="app.js" async></script>
            </html>
        );
    }
});

module.exports = App;

if (typeof window !== 'undefined') {
    var ApplicationElement = React.createFactory(App);
    React.render(Context(ApplicationElement), document);
    window.React = React; // export for http://fb.me/react-devtools
}
