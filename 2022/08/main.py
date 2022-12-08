import timeit
from typing import List


def read_input() -> List[str]:
    with open('input.txt') as input_file:
        return input_file.read().splitlines()


def part_one(lines: List[str]) -> int:
    grid_height = len(lines)
    grid_width = len(lines[0])
    number_of_visible_tress = (grid_width * 2) + (grid_height * 2) - 4

    for i in range(1, grid_width - 1):
        for j in range(1, grid_height - 1):
            height_of_tree_to_examine = lines[j][i]
            isVisible = True

            for x in range(0, j):  # Tress to top
                if lines[x][i] >= height_of_tree_to_examine:
                    isVisible = False
                    break

            if isVisible:
                number_of_visible_tress += 1
                continue
            isVisible = True

            for x in range(i + 1, grid_width):  # Trees to right
                if lines[j][x] >= height_of_tree_to_examine:
                    isVisible = False
                    break

            if isVisible:
                number_of_visible_tress += 1
                continue
            isVisible = True

            for x in range(j + 1, grid_height):  # Trees to bottom
                if lines[x][i] >= height_of_tree_to_examine:
                    isVisible = False
                    break

            if isVisible:
                number_of_visible_tress += 1
                continue
            isVisible = True

            for x in range(0, i):  # Trees to left
                if lines[j][x] >= height_of_tree_to_examine:
                    isVisible = False
                    break

            if not isVisible:
                continue

            number_of_visible_tress += 1

    return number_of_visible_tress


def part_two(lines: List[str]) -> int:
    grid_height = len(lines)
    grid_width = len(lines[0])
    best_scenic_score = 0

    for i in range(1, grid_width - 1):
        for j in range(1, grid_height - 1):
            height_of_tree_to_examine = lines[j][i]

            top_viewing_distance = 0
            for x in range(j-1, -1, -1):  # Tress to top
                top_viewing_distance += 1
                if lines[x][i] >= height_of_tree_to_examine:
                    break

            right_viewing_distance = 0
            for x in range(i + 1, grid_width):  # Trees to right
                right_viewing_distance += 1
                if lines[j][x] >= height_of_tree_to_examine:
                    break

            bottom_viewing_distance = 0
            for x in range(j + 1, grid_height):  # Trees to bottom
                bottom_viewing_distance += 1
                if lines[x][i] >= height_of_tree_to_examine:
                    break

            left_viewing_distance = 0
            for x in range(i-1, -1, -1):  # Trees to left
                left_viewing_distance += 1
                if lines[j][x] >= height_of_tree_to_examine:
                    break

            scenic_score = top_viewing_distance * right_viewing_distance * \
                bottom_viewing_distance * left_viewing_distance
            if scenic_score > best_scenic_score:
                best_scenic_score = scenic_score

    return best_scenic_score


start_time = timeit.default_timer()
input = read_input()
print(f'read file: {timeit.default_timer() - start_time}')
start_time = timeit.default_timer()
print(f'part 1: {part_one(input)}')
print(f'part 1: {timeit.default_timer() - start_time}')
print(f'part 2: {part_two(input)}')
print(f'part 2: {timeit.default_timer() - start_time}')
