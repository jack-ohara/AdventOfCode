def get_initial_crate_stacks_and_instructions() -> tuple[dict[str, list[str]], list[str]]:
    with open('input.txt') as input_file:
        lines = input_file.read().splitlines()

        raw_crate_stacks: list[list[str]] = [[], [], [], [], [], [], [], [], []]
        crate_stacks: dict[str, list[str]] = {}
        for line in lines:
            if line.startswith('['):
                for i in range(0, len(line), 4):
                    crate = line[i:i+3]
                    if not crate.isspace():
                        raw_crate_stacks[i // 4].append(crate[1])
            else:
                for i in range(0, len(line), 4):
                    crate_stack_index = line[i + 1]
                    target_stack = raw_crate_stacks[i // 4]
                    target_stack.reverse()
                    crate_stacks[crate_stack_index] = target_stack
                break

        instructions: list[str]
        for i in range(len(lines)):
            line = lines[i]
            if not line.startswith('move'):
                continue

            instructions = lines[i:]
            break

        return (crate_stacks, instructions)

def rearrange_crates(stacks: dict[str, list[str]], instructions: list[str], reverse=True) -> str:
    for instruction in instructions:
        [_, number_to_move, _, move_from, _, move_to] = instruction.split(' ')
        moved_crates = stacks[move_from][-int(number_to_move):]
        del stacks[move_from][-int(number_to_move):]
        if (reverse):
            moved_crates.reverse()
        stacks[move_to].extend(moved_crates)

    top_of_each_stack = list(map(lambda stack: stack[-1], stacks.values()))
    return ''.join(top_of_each_stack)

def part_one() -> str:
    [crate_stacks, instructions] = get_initial_crate_stacks_and_instructions()

    return rearrange_crates(crate_stacks, instructions)

def part_two() -> str:
    [crate_stacks, instructions] = get_initial_crate_stacks_and_instructions()

    return rearrange_crates(crate_stacks, instructions, reverse=False)


print(part_two())
