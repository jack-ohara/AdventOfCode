"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const data = (0, fs_1.readFileSync)("./input.txt", "utf-8");
const lines = data.split("\n");
const numbersToDraw = lines[0].split(",").map((e) => parseInt(e));
const boards = getBoards(lines.splice(2));
function partOne() {
    for (const drawnNumber of numbersToDraw) {
        markNumbers(drawnNumber, boards);
        const winners = checkForWinners(boards);
        if (winners.length) {
            return getUnmarkedNumbersValue(winners[0]) * drawnNumber;
        }
    }
}
function partTwo() {
    let drawnNumber;
    let losingBoards = boards;
    let winnerFinalScore = 0;
    for (drawnNumber of numbersToDraw) {
        markNumbers(drawnNumber, losingBoards);
        const winners = checkForWinners(losingBoards);
        if (winners.length) {
            for (const winner of winners) {
                const winnerIndex = losingBoards.indexOf(winner);
                if (winnerIndex > -1) {
                    losingBoards.splice(winnerIndex, 1);
                }
                winnerFinalScore = getUnmarkedNumbersValue(winner) * drawnNumber;
            }
        }
    }
    return winnerFinalScore;
}
function getBoards(rawLines) {
    let boards = [];
    let currentBoard = [];
    let yVal = 0;
    for (const line of rawLines) {
        if (line) {
            const boardNumbers = line
                .split(" ")
                .filter((s) => s)
                .map((e, idx) => {
                return {
                    value: parseInt(e),
                    marked: false,
                    position: { x: idx, y: yVal },
                };
            });
            currentBoard = currentBoard.concat(boardNumbers);
            yVal++;
        }
        else {
            boards.push(currentBoard);
            currentBoard = [];
            yVal = 0;
        }
    }
    return boards;
}
function markNumbers(drawnNumber, boards) {
    for (const board of boards) {
        for (const number of board) {
            if (number.value === drawnNumber) {
                number.marked = true;
            }
        }
    }
}
function checkForWinners(boards) {
    let winners = [];
    for (const board of boards) {
        for (let index = 0; index < 5; index++) {
            if (board
                .filter((boardNum) => boardNum.position.x == index)
                .every((boardNum) => boardNum.marked) ||
                board
                    .filter((boardNum) => boardNum.position.y == index)
                    .every((boardNum) => boardNum.marked)) {
                winners.push(board);
            }
        }
    }
    return winners;
}
function getUnmarkedNumbersValue(winner) {
    return winner.reduce((acc, a) => acc + (a.marked ? 0 : a.value), 0);
}
console.log(partOne());
console.log(partTwo());
