var Bacon = require('baconjs');
var BaconAction = require('../../../lib/bacon-action');
var ExampleData = require('../ChatExampleData');

module.exports = function() {
    return {
        createMessage: new BaconAction(function (text) {
            if (text.trim()) {
                this.push(text);
            }
        }),
        getAllMessages: Bacon.constant(ExampleData.init())
    };
};
