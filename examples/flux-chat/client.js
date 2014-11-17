var React = require('react');
var ChatApp = require('./components/ChatApp.react');
var StoreMixin = require('../../lib/store.mixin');
var Context = require('./context');

var App = React.createClass({
    mixins: [StoreMixin],
    render: function() {
        return (
            <html lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <title>Flux • Chat</title>
                    <link href='http://fonts.googleapis.com/css?family=Muli' rel='stylesheet' type='text/css' />
                    <link rel="stylesheet" href="css/chatapp.css" />
                </head>
                <ChatApp />
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
