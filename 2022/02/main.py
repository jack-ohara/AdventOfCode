winning_moves = {
    'A': 'Y',
    'B': 'Z',
    'C': 'X'
}

equivalent_moves = {
    'A': 'X',
    'B': 'Y',
    'C': 'Z'
}

losing_moves = {
    'A': 'Z',
    'B': 'X',
    'C': 'Y'
}

selection_scores = {
    'X': 1,
    'Y': 2,
    'Z': 3
}

def part_one() -> int:
    with open('input.txt') as input_file:
        lines = input_file.read().splitlines()
        score = 0

        for match in lines:
            opponent_move = match[0]
            reccomended_move = match[-1]

            match_outcome_score = 6 if reccomended_move == winning_moves[opponent_move] else 3 if equivalent_moves[opponent_move] == reccomended_move else 0
            score += match_outcome_score + selection_scores[reccomended_move]

    return score

def part_two() -> int:
    with open('input.txt') as input_file:
        lines = input_file.read().splitlines()
        score = 0

        for match in lines:
            opponent_move = match[0]
            reccomended_outcome = match[-1]

            if (reccomended_outcome == 'Z'): # Win
                score += selection_scores[winning_moves[opponent_move]] + 6
            elif (reccomended_outcome == 'Y'): # Draw
                score += selection_scores[equivalent_moves[opponent_move]] + 3
            else:
                score += selection_scores[losing_moves[opponent_move]]
        
    return score


print(part_two())