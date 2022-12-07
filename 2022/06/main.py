def find_marker(data: str, number_of_marker_chars: int) -> int:
    for i in range(number_of_marker_chars, len(data)):
            last_set_of_chars = set(data[i-number_of_marker_chars:i])

            if len(last_set_of_chars) == number_of_marker_chars:
                return i

def part_one() -> int:
    with open('input.txt') as input_file:
        data = input_file.read()

        return find_marker(data, 4)

def part_two() -> int:
    with open('input.txt') as input_file:
        data = input_file.read()

        return find_marker(data, 14)

print(part_one())
print(part_two())