function DateBuilder(options) {
    this.minMilliDelta = 0;
    this.maxMilliDelta = 0;
    this.meanDate = new Date();
    this.seed = this.meanDate.toString();
    this.setFixedPointDate = this.meanDate;
    this.standardDeviationMilli = 0;
}

(function (proto_) {

    proto_.setMinimumMilliDelta = function (minMilliDelta) {
        this.minMilliDelta = minMilliDelta;

        return this;
    };

    proto_.setMaximumMilliDelta = function (maxMilliDelta) {
        this.maxMilliDelta = maxMilliDelta;

        return this;
    };

    proto_.setMeanDate = function (meanDate) {
        this.meanDate = meanDate;

        return this;
    };

    proto_.setFixedPointDate = function (fixedPointDate) {
        this.setFixedPointDate = fixedPointDate;

        return this;
    };

    proto_.setStandardDeviationDate = function (standardDeviationDate) {
        this.standardDeviationMilli = standardDeviationMilli;

        return this;
    };

    proto_.setSeed = function (seedString) {
        this.seed = seedString;
    };

    proto_.getResult = function () {
        
    };
    
}(DateBuilder.prototype));

module.exports = DateBuilder;
