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

        context("rating of 1704 and 1849", () => {
            let result = Elo.outcome_probabilities(1704.0, 1849.0);

            it("returns (19%, 27%, 54%)", () => {
                let (win_prob, draw_prob, loss_prob) = result;
                let percentages = (
                    Probability.to_percentage(win_prob),
                    Probability.to_percentage(draw_prob),
                    Probability.to_percentage(loss_prob)
                );

                expect(percentages)->to_equal((19, 27, 54));
            });
        });
    });
});
