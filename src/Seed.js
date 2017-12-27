class Seed {
    constructor(value, delimiter) {
        this.value = value || '';
        this.delimiter = delimiter || ' ';
    }

    setValue(value) {
        return new Seed(value, this.delimiter);
    }

    getDelimiter() {
        return this.delimiter;
    }

    setDelimiter(delimiter) {
        return new Seed(this.value, delimiter);
    }

    append(value) {
        var value = this.value + this.delimiter + value;

        return new Seed(value, this.delimiter);
    }
}

module.exports = Seed;
