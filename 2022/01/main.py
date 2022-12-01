def get_calories_carried_by_elves() -> list[int]:
    calories_carried_by_elves: list[int] = []
    with open('input.txt') as input:
        input_lines = input.read().splitlines()

        current_elf_calories:int = 0
        for line in input_lines:
            if line == '':
                calories_carried_by_elves.append(current_elf_calories)
                current_elf_calories = 0
                continue

            current_elf_calories += int(line)

    return calories_carried_by_elves

def part_one() -> int:
    all_calroies = get_calories_carried_by_elves()

    return max(all_calroies)

def part_two() -> int:
    all_calroies = get_calories_carried_by_elves()

    sorted_calories = sorted(all_calroies)

    return sorted_calories[-1] + sorted_calories[-2] + sorted_calories[-3]

print(part_two())