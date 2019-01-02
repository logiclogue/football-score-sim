type 'a assertion

external expect
    : 'a -> 'a assertion
    = ""
    [@@bs.module "chai"]

external to_equal
    : 'a assertion -> 'a -> unit
    = "equal"
    [@@bs.send]

external equal
    : 'a assertion -> 'a -> unit
    = ""
    [@@bs.send]

external t
    : 'a assertion -> 'a assertion
    = "to"
    [@@bs.get]

external deep
    : 'a assertion -> 'a assertion
    = ""
    [@@bs.get]
