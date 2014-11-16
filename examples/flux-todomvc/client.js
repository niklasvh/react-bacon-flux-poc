var React = require('react');

var StoreMixin = {
    contextTypes: {
        store: React.PropTypes.object.isRequired
    },
    childContextTypes: {
        store: React.PropTypes.object
    },
    getChildContext: function() {
        return this.context.store;
    }
};

var Lol = React.createClass({
    mixins: [StoreMixin],
    render: function() {
        return (
            <div>a
            {this.context.x}
            </div>
            );
    }
});

var Bodys = React.createClass({
    mixins: [StoreMixin],
    render: function() {
        console.log(this);
        return (
            <div>
                <Lol>b
            {this.context.x}
                    </Lol>
            </div>
            );
    }
});

var App = React.createClass({
    mixins: [StoreMixin],
    getChildContext: function() {
        return {store: {}};
    },
    render: function() {
        return (
            <html lang="en">
                <head>
                    <link rel="stylesheet" href="/assets/css/main.css" />
                    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,300' rel='stylesheet' type='text/css' />
                </head>
                <Bodys />
            </html>
            );
    }
});

module.exports = App;
