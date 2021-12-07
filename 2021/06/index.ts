import { readFileSync } from "fs";

let fishes = readFileSync("./input.txt", "utf-8")
  .split(",")
  .map((e) => parseInt(e));

function partOne() {
  return getNumberOfFishAfterDays(80);
}

function partTwo() {
  return getNumberOfFishAfterDays(256);
}

function getNumberOfFishAfterDays(daysRemaining: number) {
  const timersToCount: { [key: number]: number } = {
    8: 0,
    7: 0,
    6: 0,
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
    0: 0,
  };

  for (const fish of fishes) {
    timersToCount[fish]++;
  }

  for (let day = 0; day < daysRemaining; day++) {
    const numberOfFishThatWillReproduce = timersToCount[0];

    timersToCount[0] = timersToCount[1];
    timersToCount[1] = timersToCount[2];
    timersToCount[2] = timersToCount[3];
    timersToCount[3] = timersToCount[4];
    timersToCount[4] = timersToCount[5];
    timersToCount[5] = timersToCount[6];
    timersToCount[6] = timersToCount[7] + numberOfFishThatWillReproduce;
    timersToCount[7] = timersToCount[8];
    timersToCount[8] = numberOfFishThatWillReproduce;
  }

  return Object.values(timersToCount).reduce((a, b) => a + b);
}

console.log(partOne());
console.log(partTwo());
