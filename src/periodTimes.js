// Period -> TimeScaler -> [[Time]]
function periodTimes(period, timeScaler) {
    return period.ratings.value.map(_ => []);
}

module.exports = periodTimes;
