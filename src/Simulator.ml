let select_outcome outcomes value = outcomes
    |> List.find (fun (_, prob) -> prob < value)
    |> fst
