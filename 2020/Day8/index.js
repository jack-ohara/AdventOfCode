const fs = require('fs');

fs.readFile('./Day8/Input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const instructions = getInstructions(data);

  // Part 1
  //console.log(getAccValueBeforeLoop(instructions));

  // Part 2
  console.log(getAccValueWithNoLoop(instructions));
});

const getInstructions = (data) => {
  return data.split('\r\n').map((e) => {
    const [instruction, offset] = e.split(' ');

    return { instruction, offset: Number(offset) };
  });
};

const getAccValueBeforeLoop = (instructions) => {
  let accumulator = 0;
  const instructionsExecuted = new Set();

  for (let i = 0; i < instructions.length; i++) {
    if (instructionsExecuted.has(i)) {
      return accumulator;
    }

    const instruction = instructions[i];

    switch (instruction.instruction) {
      case 'nop':
        break;

      case 'acc':
        accumulator += instruction.offset;
        break;

      case 'jmp':
        i += instruction.offset - 1;
        break;

      default:
        console.error(`Unrecognised instruction: ${instruction.instruction}`);
    }

    instructionsExecuted.add(i);
  }

  console.error('no repeated instructions');
  return 0;
};

const getAccValueWithNoLoop = (instructions) => {
  let allInstructionsExecuted = false;
  let transformIndex = 0;
  let accumulator = 0;

  while (!allInstructionsExecuted) {
    [transformedInstructions, transformIndex] = transformInstructions(
      instructions,
      transformIndex
    );

    accumulator = 0;
    allInstructionsExecuted = true;
    const instructionsExecuted = new Set();

    for (let i = 0; i < transformedInstructions.length; i++) {
      if (instructionsExecuted.has(i)) {
        allInstructionsExecuted = false;
        break;
      }

      const instruction = transformedInstructions[i];

      switch (instruction.instruction) {
        case 'nop':
          break;

        case 'acc':
          accumulator += instruction.offset;
          break;

        case 'jmp':
          i += instruction.offset - 1;
          break;

        default:
          console.error(`Unrecognised instruction: ${instruction.instruction}`);
      }

      instructionsExecuted.add(i);
    }
  }

  return accumulator;
};

const transformInstructions = (defaultInstructions, searchFromIndex) => {
  const instructionsClone = JSON.parse(JSON.stringify(defaultInstructions));

  for (let i = searchFromIndex; i < instructionsClone.length; i++) {
    const instruction = instructionsClone[i];

    switch (instruction.instruction) {
      case 'nop':
        instructionsClone.splice(i, 1, {
          instruction: 'jmp',
          offset: instruction.offset,
        });
        return [instructionsClone, i + 1];

      case 'jmp':
        instructionsClone.splice(i, 1, {
          instruction: 'nop',
          offset: instruction.offset,
        });
        return [instructionsClone, i + 1];
    }
  }

  console.error('Could not find a nop or jmp instruction to transform');
};
