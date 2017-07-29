var quantile = require('distributions-normal-quantile');

function quantileAdapter(x, mean, standardDeviation) {
    return quantile(x, {
        'mu': mean,
        'sigma': standardDeviation
    });
}

module.exports = quantileAdapter;
