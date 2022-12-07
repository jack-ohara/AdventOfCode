def get_item_priority(item: str) -> int:
    if item.islower():
        return ord(item) - ord('a') + 1

    return ord(item) - ord('A') + 27

def part_one() -> int:
    total_priority = 0
    with open('input.txt') as input_file:
        lines = input_file.read().splitlines()

        for line in lines:
            first_half = line[:int(len(line)/2)]
            second_half = line[int(len(line)/2):]

            intersect = set(first_half) & set(second_half)
            common_item = intersect.pop()

            total_priority += get_item_priority(common_item)

    return total_priority

def part_two() -> int:
    total_priority = 0
    with open('input.txt') as input_file:
        lines = input_file.read().splitlines()
        groups: list[list[str]] = []

        indexes = list(range(0, len(lines), 3))
        for i in range(len(indexes)):
            if i == len(indexes) - 1:
                groups.append(lines[indexes[i]:])
                break

            groups.append(lines[indexes[i]:indexes[i + 1]])

        for group in groups:
            intersect = set(group[0]) & set(group[1]) & set(group[2])
            badge = intersect.pop()

            total_priority += get_item_priority(badge)

    return total_priority

print(part_two())