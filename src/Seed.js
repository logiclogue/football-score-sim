const random = require("seeded-random");

class Seed {
    constructor(value, delimiter) {
        this.value = value || '';
        this.delimiter = delimiter || ' ';
    }

    setValue(value) {
        return new Seed(value, this.delimiter);
    }

    setDelimiter(delimiter) {
        return new Seed(this.value, delimiter);
    }

    append(value) {
        var value = this.value + this.delimiter + value;

        return new Seed(value, this.delimiter);
    }

    get decimal() {
        return random.decimal(this.value);
    }
}

String.prototype.toSeed = function (delimiter) {
    return new Seed(this.toString(), delimiter);
};

module.exports = Seed;
