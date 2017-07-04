function DateBuilder() {
    this.minMilliDelta = 0;
    this.maxMilliDelta = 0;
    this.meanDate = new Date();
    this.seed = this.meanDate.toString();
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
        
    };

    proto_.setStandardDeviationDate = function () {
        
    };

    proto_.setSeed = function () {
        
    };

    proto_.getResult = function () {
        
    };
    
}(DateBuilder.prototype));

module.exports = DateBuilder;
