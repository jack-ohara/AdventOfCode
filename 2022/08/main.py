import timeit

def part_one() -> int:
    with open('input.txt') as input_file:
        lines = input_file.read().splitlines()
        grid_height = len(lines)
        grid_width = len(lines[0])
        number_of_visible_tress = (grid_width * 2) + (grid_height * 2) - 4

        for i in range(1, grid_width - 1):
            for j in range(1, grid_height - 1):
                height_of_tree_to_examine = lines[j][i]
                isVisible = True

                for x in range(0, j): # Tress to top
                    if lines[x][i] >= height_of_tree_to_examine:
                        isVisible = False
                        break

                if isVisible:
                    number_of_visible_tress += 1
                    continue
                isVisible = True

                for x in range(i + 1, grid_width): # Trees to right
                    if lines[j][x] >= height_of_tree_to_examine:
                        isVisible = False
                        break

                if isVisible:
                    number_of_visible_tress += 1
                    continue
                isVisible = True

                for x in range(j + 1, grid_height): # Trees to bottom
                    if lines[x][i] >= height_of_tree_to_examine:
                        isVisible = False
                        break

                if isVisible:
                    number_of_visible_tress += 1
                    continue
                isVisible = True

                for x in range(0, i): # Trees to left
                    if lines[j][x] >= height_of_tree_to_examine:
                        isVisible = False
                        break

                if not isVisible:
                    continue

                number_of_visible_tress += 1

        return number_of_visible_tress

start_time = timeit.default_timer()
print(part_one())
print(f'part 1: {timeit.default_timer() - start_time}')