type q_val = float

let calculate_q rating = 10.0 ** (rating /. 400.0)

let calculate_expected qa qb qc = qa /. (qa +. qb +. qc)

let draw_rating rating_a rating_b =
    let average = (rating_a +. rating_b) /. 2.0 in

    average -. 50.0

let outcome_probabilities rating_a rating_b =
    let q_win  = calculate_q rating_a in
    let q_draw = draw_rating rating_a rating_b |> calculate_q in
    let q_loss = calculate_q rating_b in

    let win_probability  = calculate_expected q_win q_draw q_loss in
    let draw_probability = calculate_expected q_draw q_win q_loss in
    let loss_probability = calculate_expected q_loss q_win q_draw in
    
    (win_probability, draw_probability, loss_probability)
