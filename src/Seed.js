function Seed(value, delimiter) {
    this.value = value || '';
    this.delimiter = delimiter || ' ';
}

Seed.prototype = {

    getValue: function () {
        return this.value;
    },

    setValue: function (value) {
        return new Seed(value, this.delimiter);
    },

    getDelimiter: function () {
        return this.delimiter;
    },

    setDelimiter: function (delimiter) {
        return new Seed(this.value, delimiter);
    },

    append: function (value) {
        var value = this.value + this.delimiter + value;

        return new Seed(value, this.delimiter);
    }

};

module.exports = Seed;
