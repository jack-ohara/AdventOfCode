def part_one() -> int:
    duplicated_sections = 0
    with open('input.txt') as input_file:
        lines = input_file.read().splitlines()

        for line in lines:
            first_section, second_section = line.split(',')
            first_section_start, first_section_end = map(int, first_section.split('-'))
            second_section_start, second_section_end = map(int, second_section.split('-'))

            if ((first_section_start >= second_section_start and first_section_end <= second_section_end) or 
                (second_section_start >= first_section_start and second_section_end <= first_section_end)):
                duplicated_sections += 1

    return duplicated_sections

def part_two() -> int:
    duplicated_sections = 0
    with open('input.txt') as input_file:
        lines = input_file.read().splitlines()

        for line in lines:
            first_section, second_section = line.split(',')
            first_section_start, first_section_end = map(int, first_section.split('-'))
            second_section_start, second_section_end = map(int, second_section.split('-'))

            first_section_ids = list(range(first_section_start, first_section_end + 1))
            second_section_ids = list(range(second_section_start, second_section_end + 1))

            intersect = set(first_section_ids) & set(second_section_ids)

            if (len(intersect) > 0):
                duplicated_sections += 1

    return duplicated_sections

print(part_two())