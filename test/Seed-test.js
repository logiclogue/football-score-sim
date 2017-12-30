const assert = require('chai').assert;
const expect = require('chai').expect;
const Seed = require('../src/Seed');
const random = require("seeded-random");

describe('Seed', function () {
    var seed;
    var delimiter = ',';
    var base = 'base';

    beforeEach(function () {
        seed = new Seed(base, delimiter);
    });

    describe('#value', function () {
        context('setValue("a").append("b")', function () {
            it('should return "a,b"', function () {
                // act
                var result = seed
                    .setValue('a')
                    .append('b')
                    .value;

                // assert
                assert.equal(result, 'a,b');
            });
        });
    });

    describe('#setValue()', function () {
        it('should return a new Seed', function () {
            // act
            var result = seed.setValue();

            // arrange
            assert.notStrictEqual(result, seed);
        });

        it('should set the value', function () {
            // arrange
            var value = 'a';

            // act
            var result = seed.setValue(value).value;

            // assert
            assert.equal(result, value);
        });

        it('should set the same delimiter', function () {
            // arrange
            var seed = new Seed('test', '@');
            var value = 'a';

            // act
            var result = seed.setValue(value);

            // assert
            assert.equal(result.delimiter, seed.delimiter);
        });
    });

    describe('#append()', function () {
        it('should return a new Seed', function () {
            // arrange
            var value = 'test seed';

            // act
            var result = seed.append(value);

            // assert
            assert.notStrictEqual(result, seed);
        });

        it('should append with the delimiter', function () {
            // act
            var result = seed
                .setValue('a')
                .append('b')
                .value;

            // assert
            assert.equal(result, 'a,b');
        });

        it('should set the delimier the same', function () {
            // act
            var result = seed
                .setValue('a')
                .append('b');

            // assert
            assert.equal(result.delimiter, seed.delimiter);
        });
    });

    describe('#setDelimiter()', function () {
        it('should return a new seed', function () {
            // arrange
            var delimier = '---';

            // act
            var result = seed.setDelimiter(delimier);

            // assert
            assert.notStrictEqual(result, seed);
        });

        it('should set the delimiter', function () {
            // arrange
            var delimiter = '---';

            // act
            var result = seed.setDelimiter(delimiter);

            // assert
            assert.equal(result.delimiter, delimiter);
        });
    });

    describe("String#toSeed()", () => {
        const seed = "testing".toSeed(",");

        context("given testing value and , delimiter", () => {
            it("sets the value as testing", () => {
                expect(seed.value).to.equal("testing");
            });

            it("sets the delimiter as ,", () => {
                expect(seed.delimiter).to.equal(",");
            });
        });
    });

    describe("#decimal", () => {
        context("given seed 'testing'", () => {
            it("returns random.decimal with seed value", () => {
                const result = "testing".toSeed().decimal;
                const decimal = random.decimal("testing");

                expect(result).to.equal(decimal);
            });
        });
    });
});
