var assert = require('chai').assert;
var Item = require('../src/ScheduleListItem');

var initialTime = Date.now();
var returnValue = 'Hello World';

var item = new Item(initialTime, function () {
    return returnValue;
});

describe('ScheduleListItem', function () {
    describe('#executed', function () {
        it('should initially be equal to false', function () {
            assert.equal(item.executed, false);
        });
    });

    describe('#startTime', function () {
        it('should initially be equal to ' + initialTime, function () {
            assert.equal(item.startTime, initialTime);
        });
    });

    describe('#callback()', function () {
        it ('should return "Hello World"', function () {
            assert.equal(item.callback(), returnValue);
        });
    });
});
