function Seed(options) {
    // Instances
    this.value = options.value || '';
    this.delimiter = options.delimiter || ':';
}

Seed.prototype = {

    getValue: function () {
        return this.value;
    },

    setValue: function (value) {
        this.value = value;

        return this;
    },

    setDelimiter: function (delimiter) {
        this.delimiter = delimiter;
    },

    append: function (value) {
        this.value += this.delimiter + value;

        return this;
    },

    clone: function () {
        var seed = new Seed({
            delimiter: this.delimiter,
            value: this.value
        });

        return seed;
    }

};

module.exports = Seed;
