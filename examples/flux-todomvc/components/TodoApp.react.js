var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var StoreMixin = require('../../../lib/store.mixin');

var TodoApp = React.createClass({
    mixins: [StoreMixin],

    stateFromStores: stores => ({
        allTodos: stores.todo.getAll,
        filteredTodos: stores.todo.getFiltered,
        areAllComplete: stores.todo.allComplete,
        filter: stores.todo.getFilter
    }),

    render: function() {
        return (
            <div id="todoapp">
                <Header />
                <MainSection allTodos={this.state.allTodos} filteredTodos={this.state.filteredTodos} areAllComplete={this.state.areAllComplete} />
                <Footer allTodos={this.state.allTodos} filter={this.state.filter} />
            </div>
        );
    }
});

module.exports = TodoApp;
