external describe
    : string -> (unit -> unit [@bs.uncurry]) -> unit
    = "describe"
    [@@bs.val]

external context
    : string -> (unit -> unit [@bs.uncurry]) -> unit
    = "context"
    [@@bs.val]

external it
    : string -> (unit -> unit [@bs.uncurry]) -> unit
    = "it"
    [@@bs.val]
