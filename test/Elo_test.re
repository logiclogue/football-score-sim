open Mocha;
open Chai;

describe("Elo", () => {
    describe("outcome_probabilities()", () => {
        context("two equal ratings", () => {
            let result = Elo.outcome_probabilities(1000.0, 1000.0);

            it("returns draw with probability 26%", () => {
                let (_, draw_probability, _) = result;

                let percentage = Probability.to_percentage(draw_probability);

                expect(percentage)->to_equal(26);
            });
        });
    });
});
