var assert = require('chai').assert;
var List = require('../js/ScheduleList/List');
var Item = require('../js/ScheduleList/Item');

var list = new List();
var item = new Item(Date.now(), function () {
    return 'Hello World';
});

var executedCount = 0;
var executedFuture = false;

var items = [
    new Item(Date.now() - 1000, function () {
        executedCount += 1;

        return 'Hello World';
    }),
    new Item(100, function () {
        executedCount += 1;

        return 'Happened a long time ago';
    }),
    new Item(10468408746789, function () {
        executedCount += 1;
        executedFuture = true;

        return 'Should never happen in my life time';
    })
];

describe('List', function () {
    describe('#addItem()', function () {
        it('should add the item to the array', function () {
            list.addItem(items[0]);
            assert.equal(list.items[0], items[0]);
        });

        it('#items should be in order', function () {
            var failed = false;

            list.addItem(items[1]);
            list.addItem(items[2]);

            items.sort(List.prototype._sortFunction);

            items.forEach(function (item, index) {
                if (item != list.items[index])
                    failed = true;
            });

            assert.equal(failed, false);
        });
    });

    describe('#run()', function () {
        it('should only execute items that have startTimes in the past (2)', function () {
            executedCount = 0;
            executedFuture = false;

            list.run();

            assert.equal(executedCount, 2);
        });

        it('should not execute the item not due to happen', function () {
            assert.equal(executedFuture, false);
        });

        it('should not execute any more the second try', function () {
            executedCount = 0;

            list.run();

            assert.equal(executedCount, 0);
        });
    });

    describe('#reset()', function () {
        it('should have reset all item executed properties to false', function () {
            var notSet = false;

            list.items.forEach(function () {
                if (item.executed)
                    notSet = true;
            });

            assert.equal(notSet, false);
        });
    });
});
