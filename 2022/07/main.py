def get_filesystem():
    with open('input.txt') as input_file:
        lines = input_file.read().splitlines()
        current_directory_elements = []
        working_directory = ''
        filesystem: dict[str, int] = {}

        for line in lines:
            cmd_line_statements = line.split(' ')
            if cmd_line_statements[0] == '$':
                if cmd_line_statements[1] == 'cd':
                    if cmd_line_statements[2] == '/':
                        current_directory_elements = []
                        working_directory = '/'
                        continue

                    if cmd_line_statements[2] == '..':
                        current_directory_elements.pop()
                    elif cmd_line_statements[2] != '/':
                        current_directory_elements.append(cmd_line_statements[2])

                    working_directory = '/' + '/'.join(current_directory_elements)
                else:
                    continue
            else:
                if cmd_line_statements[0] == 'dir':
                    directory = working_directory + cmd_line_statements[1] if working_directory == '/' else working_directory + '/' + cmd_line_statements[1]
                    if directory not in filesystem:
                        filesystem[directory] = 0
                else:
                    if working_directory not in filesystem:
                        filesystem[working_directory] = 0

                    filesystem['/'] += int(cmd_line_statements[0])

                    for i in range(len(current_directory_elements)):
                        filesystem['/' + '/'.join(current_directory_elements[:i + 1])] += int(cmd_line_statements[0])
        
        return filesystem

def part_one() -> int:
    filesystem = get_filesystem()

    all_values_under_threshold = [x for x in list(filesystem.values()) if x <= 100000]
    return sum(all_values_under_threshold)

def part_two() -> int:
    filesystem = get_filesystem()

    remaining_space_on_disk = 70000000 - filesystem['/']
    min_size_of_dir_to_delete = 30000000 - remaining_space_on_disk
    eligible_dirs_to_delete = [x for x in list(filesystem.values()) if x >= min_size_of_dir_to_delete]
    sorted_eligible_dirs = sorted(eligible_dirs_to_delete)
    return sorted_eligible_dirs[0]

print(part_one())
print(part_two())