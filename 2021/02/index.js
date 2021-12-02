"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const data = (0, fs_1.readFileSync)("./input.txt", "utf-8");
const commands = data.split("\n").filter((s) => s);
function partOne() {
    let horizontalPosition = 0;
    let depth = 0;
    const directionToAction = {
        forward: (val) => (horizontalPosition += val),
        up: (val) => (depth -= val),
        down: (val) => (depth += val),
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
    const directionToAction = {
        forward: (val) => {
            horizontalPosition += val;
            depth += aim * val;
        },
        up: (val) => (aim -= val),
        down: (val) => (aim += val),
    };
    commands.forEach((command) => {
        const [direction, value] = command.split(" ");
        directionToAction[direction](parseInt(value));
    });
    return horizontalPosition * depth;
}
console.log(partOne());
console.log(partTwo());
