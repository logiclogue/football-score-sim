type 'a outcome_probability = ('a * float) list
type 'a outcome_cumulative = ('a * float) list

val select_outcome : ('a * float) list -> float -> 'a

(*val match_to_outcome : Match.t -> Outcome.t*)
