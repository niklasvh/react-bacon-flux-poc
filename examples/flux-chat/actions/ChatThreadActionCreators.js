var Bacon = require('baconjs');
var BaconAction = require('../../../lib/bacon-action');

module.exports = function() {
    return {
        clickThread: new BaconAction()
    };
};
