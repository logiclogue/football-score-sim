var assert = require('chai').assert;
var Seed = require('../src/Seed');

describe('Seed', function () {
    var seed;
    var delimiter = ',';
    var base = 'base';

    beforeEach(function () {
        seed = new Seed({
            delimiter: delimiter,
            values: base
        });
    });

    describe('#getValue()', function () {
        context('setValue("a").append("b")', function () {
            it('should return "a,b"', function () {
                // arrange
                var expected = 'a,b';

                seed.setValue('a')
                    .append('b');

                // act
                var result = seed.getValue();

                // assert
                assert.equal(result, expected);
            });
        });
    });

    describe('#setValue()', function () {
        it('should return this', function () {
            // act
            var result = seed.setValue();

            // assert
            assert.strictEqual(result, seed);
        });

        it('should set the value', function () {
            // arrange
            var value = 'a';

            // act
            seed.setValue(value);

            var result = seed.getValue();

            // assert
            assert.equal(result, value);
        });
    });

    describe('#append()', function () {
        it('should return this', function () {
            // arrange
            var value = 'test seed';

            // act
            var result = seed.append(value);

            // assert
            assert.strictEqual(result, seed);
        });

        it('should append with the delimiter', function () {
            // act
            seed.setValue('a')
                .append('b');

            var result = seed.getValue();

            // assert
            assert.equal(result, 'a,b');
        });
    });

    describe('#setDelimiter()', function () {
        it('should set the delimiter', function () {
            // arrange
            var delimiter = '---';

            // act
            seed.setDelimiter(delimiter);

            // assert
            assert.equal(seed.delimiter, delimiter);
        });
    });

    describe('#clone()', function () {
        it('should return new Seed', function () {
            // act
            var result = seed.clone();

            // assert
            assert.notStrictEqual(result, seed);
            assert.deepEqual(result, seed);
            assert.instanceOf(result, Seed);
        });
    });
});
