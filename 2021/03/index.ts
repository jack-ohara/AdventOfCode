import { readFileSync } from "fs";

const data = readFileSync("./input.txt", "utf-8");
const reportLines = data.split("\n").filter((s) => s);

function partOne() {
  let gammaBin = "";
  let epsilonBin = "";

  for (let mostCommonBitCount of getActiveBitCounts(reportLines)) {
    gammaBin += Number(mostCommonBitCount > reportLines.length / 2);
    epsilonBin += Number(mostCommonBitCount < reportLines.length / 2);
  }

  return parseInt(gammaBin, 2) * parseInt(epsilonBin, 2);
}

function partTwo() {
  let oxygenGenRating = getRating(
    reportLines,
    (bit: string, mostCommonBit: string) => bit === mostCommonBit,
    (bit: string) => bit === "1"
  );

  // let c02GenRating = getRating(
  //   reportLines,
  //   (bit: string, mostCommonBit: string) => bit !== mostCommonBit,
  //   (bit: string) => bit === "0"
  // );

  // if (!oxygenGenRating || !c02GenRating) throw "oh shit";

  // console.log(oxygenGenRating);
  // console.log(c02GenRating);

  // return parseInt(oxygenGenRating, 2) * parseInt(c02GenRating, 2);
}

function getActiveBitCounts(inputData: string[]) {
  let activeBitCounts: number[] = [];

  for (let linesIndex = 0; linesIndex < inputData.length; linesIndex++) {
    const line = inputData[linesIndex];

    for (let index = 0; index < line.length; index++) {
      const bit = line[index];

      if (linesIndex === 0) {
        activeBitCounts.push(0);
      }

      activeBitCounts[index] += parseInt(bit);
    }
  }

  return activeBitCounts;
}

export function getRating(
  dataSet: string[],
  matchPredicate: (bit: string, mostCommonBit: string) => boolean,
  equalNumberOfBitsPredicate: (bit: string) => boolean
) {
  const activeBitCounts = getActiveBitCounts(dataSet);

  let dataToExamine = dataSet;

  for (let index = 0; index < activeBitCounts.length; index++) {
    const activeBitCount = activeBitCounts[index];

    dataToExamine = dataToExamine.filter((e) =>
      activeBitCount === dataToExamine.length / 2
        ? equalNumberOfBitsPredicate(e[index])
        : matchPredicate(
            e[index],
            activeBitCount > dataToExamine.length / 2 ? "1" : "0"
          )
    );

    if (dataToExamine.length === 1) {
      return dataToExamine[0];
    }
  }
}

// console.log(partOne());
// console.log(partTwo());
