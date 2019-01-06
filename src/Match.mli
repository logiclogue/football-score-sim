type t = {
    home_rating: Rating.t;
    away_rating: Rating.t;
    seed:        string;
}

val create : Rating.t -> Rating.t -> string -> t
