import { readFileSync } from "fs";

const data = readFileSync("./input.txt", "utf-8");
const lines = data.split("\n");
const numbersToDraw = lines[0].split(",").map((e) => parseInt(e));
const boards = getBoards(lines.splice(2));

interface boardNumber {
  value: number;
  marked: boolean;
  position: { x: 0 | 1 | 2 | 3 | 4; y: 0 | 1 | 2 | 3 | 4 };
}

type board = boardNumber[];

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
  let drawnNumber: number | undefined;
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

function getBoards(rawLines: string[]): board[] {
  let boards: boardNumber[][] = [];

  let currentBoard: board = [];
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
          } as boardNumber;
        });

      currentBoard = currentBoard.concat(boardNumbers);

      yVal++;
    } else {
      boards.push(currentBoard);
      currentBoard = [];
      yVal = 0;
    }
  }

  return boards;
}

function markNumbers(drawnNumber: number, boards: board[]) {
  for (const board of boards) {
    for (const number of board) {
      if (number.value === drawnNumber) {
        number.marked = true;
      }
    }
  }
}

function checkForWinners(boards: board[]): board[] {
  let winners: board[] = [];
  for (const board of boards) {
    for (let index = 0; index < 5; index++) {
      if (
        board
          .filter((boardNum) => boardNum.position.x == index)
          .every((boardNum) => boardNum.marked) ||
        board
          .filter((boardNum) => boardNum.position.y == index)
          .every((boardNum) => boardNum.marked)
      ) {
        winners.push(board);
      }
    }
  }

  return winners;
}

function getUnmarkedNumbersValue(winner: board): number {
  return winner.reduce((acc, a) => acc + (a.marked ? 0 : a.value), 0);
}

console.log(partOne());
console.log(partTwo());
