function Seed() {
    this.value = '';
    this.delimiter = ' ';
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
        var seed = new Seed();

        seed.setValue(this.value);
        seed.setDelimiter(this.delimiter);

        return seed;
    }

};

module.exports = Seed;
