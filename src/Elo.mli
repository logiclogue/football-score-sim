type q_val
type probability

val calculate_q : Rating.t -> q_val

val calculate_expected : q_val -> q_val -> q_val -> probability

val outcome_probabilities
    : Rating.t -> Rating.t
    -> probability * probability * probability
