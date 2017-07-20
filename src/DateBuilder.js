var Seed = require('./Seed');
var iocConfig = require('./iocConfig');

function DateBuilder(options) {
    this.minMilliDelta = options.minMilliDelta || {
        isInfinite: true,
        value: 0
    };
    this.maxMilliDelta = options.maxMilliDelta || {
        isInfinite: true,
        value: 0
    };
    this.meanDate = options.meanDate || new Date();
    this.seed = new Seed();
    this.seed = options.seed ||
        new Seed()
            .setValue(this.meanDate.toString());
    this.setFixedPointDate = this.meanDate;
    this.fixedPointDate = options.fixedPointDate || this.meanDate;
    this.standardDeviationMilli = options.standardDeviationMilli || 1;
    this.calculateArea = iocConfig.calculateArea || options.calculateArea;
}

(function (proto_) {

    proto_.getResult = function () {
        
    };
    
}(DateBuilder.prototype));

module.exports = DateBuilder;
