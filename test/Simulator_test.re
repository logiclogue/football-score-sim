open Mocha;
open Chai;

describe("Simulator", () => {
    describe("probability_to_outcome", () => {
        context("given [(Win, 0.4), (Loss, 0.6)]", () => {
            let outcomes = [(Outcome.Win, 0.4), (Outcome.Loss, 0.6)];
            let f = Simulator.select_outcome(outcomes);

            context("and value of 0.2", () => {
                let result = f(0.2);

                it("returns Win", () => {
                    expect(result)->to_equal(Outcome.Win);
                });
            });

            context("and value of 0.4", () => {
                let result = f(0.4);

                it("returns Win", () => {
                    expect(result)->to_equal(Outcome.Win);
                });
            });

            context("and value of 0.5", () => {
                let result = f(0.5);

                it("returns Win", () => {
                    expect(result)->to_equal(Outcome.Loss);
                });
            });
        });
    });
});
