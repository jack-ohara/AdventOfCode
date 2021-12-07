"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
let horizontalPositions = (0, fs_1.readFileSync)("./input.txt", "utf-8")
    .split(",")
    .map((e) => parseInt(e));
function partOne() {
    const median = horizontalPositions.sort((a, b) => a - b)[horizontalPositions.length / 2];
    const totalFuelCost = horizontalPositions.reduce((acc, val) => acc + Math.abs(val - median), 0);
    return totalFuelCost;
}
function partTwo() {
    const mean = Math.floor(horizontalPositions.reduce((a, b) => a + b, 0) / horizontalPositions.length);
    const reducer = (acc, currentVal) => {
        const distanceToMean = Math.abs(currentVal - mean);
        const fuelCost = (distanceToMean * (distanceToMean - 1)) / 2 + distanceToMean;
        return acc + fuelCost;
    };
    const totalFuelCost = horizontalPositions.reduce(reducer, 0);
    return totalFuelCost;
}
console.log(partOne());
console.log(partTwo());
