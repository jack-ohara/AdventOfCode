import { readFileSync } from "fs";

const data = readFileSync("./input.txt", "utf-8");
const lines = data
  .split("\n")
  .filter((s) => s)
  .map((e): line => {
    const [start, end] = e.split(" -> ");
    const [startX, startY] = start.split(",").map((e) => parseInt(e));
    const [endX, endY] = end.split(",").map((e) => parseInt(e));

    return {
      start: { x: startX, y: startY },
      end: { x: endX, y: endY },
    };
  });

interface line {
  start: { x: number; y: number };
  end: { x: number; y: number };
}

interface ventLocation {
  x: number;
  y: number;
  ventCount: number;
}

function partOne() {
  const ventLocations: ventLocation[] = [];

  for (const line of lines) {
    if (line.start.x === line.end.x) {
      const difference = Math.abs(line.start.y - line.end.y);

      const minYCoord = Math.min(line.start.y, line.end.y);

      for (let yCoord = minYCoord; yCoord <= minYCoord + difference; yCoord++) {
        const existingVentLocation = ventLocations.find(
          (e) => e.x === line.start.x && e.y === yCoord
        );

        if (existingVentLocation) {
          existingVentLocation.ventCount++;
        } else {
          ventLocations.push({ x: line.start.x, y: yCoord, ventCount: 1 });
        }
      }
    } else if (line.start.y === line.end.y) {
      const difference = Math.abs(line.start.x - line.end.x);

      const minXCoord = Math.min(line.start.x, line.end.x);

      for (let xCoord = minXCoord; xCoord <= minXCoord + difference; xCoord++) {
        const existingVentLocation = ventLocations.find(
          (e) => e.x === xCoord && e.y === line.start.y
        );

        if (existingVentLocation) {
          existingVentLocation.ventCount++;
        } else {
          ventLocations.push({ x: xCoord, y: line.start.y, ventCount: 1 });
        }
      }
    }
  }

  return ventLocations.filter((e) => e.ventCount > 1).length;
}

function partTwo() {
  const ventLocations: ventLocation[] = [];

  for (const line of lines) {
    const xDelta = Math.abs(line.start.x - line.end.x);
    const yDelta = Math.abs(line.start.y - line.end.y);

    if (line.start.x === line.end.x) {
      const minYCoord = Math.min(line.start.y, line.end.y);

      for (let yCoord = minYCoord; yCoord <= minYCoord + yDelta; yCoord++) {
        const existingVentLocation = ventLocations.find(
          (e) => e.x === line.start.x && e.y === yCoord
        );

        if (existingVentLocation) {
          existingVentLocation.ventCount++;
        } else {
          ventLocations.push({ x: line.start.x, y: yCoord, ventCount: 1 });
        }
      }
    } else if (line.start.y === line.end.y) {
      const minXCoord = Math.min(line.start.x, line.end.x);

      for (let xCoord = minXCoord; xCoord <= minXCoord + xDelta; xCoord++) {
        const existingVentLocation = ventLocations.find(
          (e) => e.x === xCoord && e.y === line.start.y
        );

        if (existingVentLocation) {
          existingVentLocation.ventCount++;
        } else {
          ventLocations.push({ x: xCoord, y: line.start.y, ventCount: 1 });
        }
      }
    } else if (xDelta === yDelta) {
      for (let offset = 0; offset <= xDelta; offset++) {
        const xCoord =
          line.start.x + (line.start.x > line.end.x ? -offset : offset);
        const yCoord =
          line.start.y + (line.start.y > line.end.y ? -offset : offset);

        const existingVentLocation = ventLocations.find(
          (e) => e.x === xCoord && e.y === yCoord
        );

        if (existingVentLocation) {
          existingVentLocation.ventCount++;
        } else {
          ventLocations.push({
            x: xCoord,
            y: yCoord,
            ventCount: 1,
          });
        }
      }
    }
  }

  return ventLocations.filter((e) => e.ventCount > 1).length;
}

//console.log(partOne());
console.log(partTwo());
