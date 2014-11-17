var StoreMixin = require('../../../lib/store.mixin');
var MessageSection = require('./MessageSection.react');
var React = require('react');
var ThreadSection = require('./ThreadSection.react');

var ChatApp = React.createClass({
    mixins: [StoreMixin],
    render: function() {
        return (
            <div className="chatapp">
                <ThreadSection />
                <MessageSection />
            </div>
        );
    }

});

module.exports = ChatApp;
