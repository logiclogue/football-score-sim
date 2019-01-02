type q_val

val calculate_q : Rating.t -> q_val

val calculate_expected : q_val -> q_val -> q_val -> Probability.t

val outcome_probabilities
    : Rating.t -> Rating.t
    -> Probability.t * Probability.t * Probability.t
