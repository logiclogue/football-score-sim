function StartFinishDates() {
    this.startDate;
    this.finishDate;
    this.milliLength = 0;
}

(function (proto_) {

    proto_.setStartDate = function (startDate) {
        this.startDate = startDate;

        return this;
    };

    proto_.setFinishdate = function (finishDate) {
        this.finishDate = finishDate;

        return this;
    };

    proto_.setMilliLength = function (milliLength) {
        this.milliLength = milliLength;

        return this;
    };

    proto_.getMilliLength = function () {
        
    };

    proto_.getAddedMilliTime = function () {
        
    };
    
}(StartFinishDates.prototype));

module.exports = StartFinishDates;
