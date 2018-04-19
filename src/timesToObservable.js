const _ = require("lodash");
const Bacon = require("baconjs");

// OccurrenceTimes -> Number -> Observable
function timesToObservable(times, scale) {
    return _(times.value)
        .map(times => timesToObservablePrime(times, scale))
        .reduce((bacon, o) => bacon.merge(o), Bacon.never());
}

// [Time] -> Number -> Observable
function timesToObservablePrime(times, scale) {
    return Bacon.fromArray(times)
        .flatMap(timeToDelay(scale));
}

// Number -> (Time -> Observable)
function timeToDelay(scale) {
    return time => Bacon.later(toMilliseconds(time, scale), time);
}

// Time -> Number -> Number
function toMilliseconds(time, scale) {
    return time.scale(scale).milliseconds;
}

module.exports = timesToObservable;
