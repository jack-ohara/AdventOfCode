import fs from "fs";

fs.readFile("../input.txt", "utf8", (err, rawDepthMeasurements) => {
  if (err) {
    console.error(err);
    return;
  }

  const result1 = countLargerMeasurments(rawDepthMeasurements);
  const result2 = countLargeThreeMeasurementWindows(rawDepthMeasurements);

  console.log(result1);
  console.log(result2);
});

function countLargerMeasurments(rawDepthMeasurements: string): number {
  const depthMeasurements = getDepthMeasurements(rawDepthMeasurements);

  let previousMeasurement: number | undefined;
  let increaseCount = 0;

  for (let index = 0; index < depthMeasurements.length; index++) {
    const depthMeasurement = depthMeasurements[index];

    if (previousMeasurement && depthMeasurement > previousMeasurement)
      increaseCount++;

    previousMeasurement = depthMeasurement;
  }

  return increaseCount;
}

function countLargeThreeMeasurementWindows(
  rawDepthMeasurements: string
): number {
  const depthMeasurements = getDepthMeasurements(rawDepthMeasurements);

  let previousWindowValue: number | undefined;
  let increaseCount = 0;

  for (let index = 2; index < depthMeasurements.length; index++) {
    const window = [
      depthMeasurements[index - 2],
      depthMeasurements[index - 1],
      depthMeasurements[index],
    ];
    const value = window.reduce((acc, a) => acc + a);

    if (previousWindowValue && value > previousWindowValue) increaseCount++;

    previousWindowValue = value;
  }

  return increaseCount;
}

function getDepthMeasurements(rawDepthMeasurements: string): number[] {
  return rawDepthMeasurements
    .split("\n")
    .filter((s) => s)
    .map(Number);
}
