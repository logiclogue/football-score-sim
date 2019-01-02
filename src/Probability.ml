type t = float

let to_float self = self

let to_percentage self = int_of_float ((to_float self) *. 100.0)
