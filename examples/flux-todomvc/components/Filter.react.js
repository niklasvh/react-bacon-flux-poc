var React = require('react/addons');
var cx = React.addons.classSet;

var Filter = React.createClass({
    shouldComponentUpdate(nextProps) {
        return this.props.active !== nextProps.active;
    },
    render: function() {
        var classes = cx({selected: this.props.active});
        return (
            <li><a href="#" onClick={this._setFilter} className={classes}>{this.props.children}</a></li>
        );
    },
    _setFilter: function() {
        this.props.onUpdate(this.props.filter);
    }
});

module.exports = Filter;
