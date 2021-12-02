import { readFileSync } from "fs";

const data = readFileSync("./input.txt", "utf-8");
const commands = data.split("\n").filter((s) => s);

function partOne() {
  let horizontalPosition = 0;
  let depth = 0;

  const directionToAction: { [direction: string]: (val: number) => void } = {
    forward: (val: number) => (horizontalPosition += val),
    up: (val: number) => (depth -= val),
    down: (val: number) => (depth += val),
  };

  commands.forEach((command) => {
    const [direction, value] = command.split(" ");

    directionToAction[direction](parseInt(value));
  });

  return horizontalPosition * depth;
}

function partTwo() {
  let aim = 0;
  let horizontalPosition = 0;
  let depth = 0;

  const directionToAction: { [direction: string]: (val: number) => void } = {
    forward: (val: number) => {
      horizontalPosition += val;
      depth += aim * val;
    },
    up: (val: number) => (aim -= val),
    down: (val: number) => (aim += val),
  };

  commands.forEach((command) => {
    const [direction, value] = command.split(" ");

    directionToAction[direction](parseInt(value));
  });

  return horizontalPosition * depth;
}

console.log(partOne());
console.log(partTwo());
