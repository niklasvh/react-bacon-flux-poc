var React = require('react');
var HistoryApp = require('./components/HistoryApp');
var Context = require('./context');
var StoreMixin = require('../../lib/store.mixin');

var App = React.createClass({
    mixins: [StoreMixin],
    render: function() {
        return (
            <html lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <title>React with History store</title>
                </head>
                <HistoryApp />
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
