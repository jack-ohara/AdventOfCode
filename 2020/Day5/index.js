const fs = require("fs");

fs.readFile("./Day5/Input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const seats = getSeats(data);
  console.table(seats);

  // Part 1
  console.log(getHighestId(seats));

  // Part 2
  console.log(findEmptySeatId(seats));
});

const getSeats = (data) => {
  return data
    .split("\n")
    .map((e) => {
      let lowerBound = 0;
      let upperBound = 127;

      let column = 0;
      let row = 0;

      for (let i = 0; i < e.length; i++) {
        if (i < 7) {
          switch (e[i]) {
            case "F":
              upperBound = Math.floor((upperBound + lowerBound) / 2);
              break;

            case "B":
              lowerBound = Math.ceil((upperBound + lowerBound) / 2);
              break;

            default:
              console.error(`'${e[i]}' is an unrecognised partition indicator`);
          }

          if (i === 6) {
            if (lowerBound !== upperBound) {
              console.error("Something went wrong :(");
            } else {
              row = lowerBound;
              lowerBound = 0;
              upperBound = 7;
            }
          }
        } else {
          switch (e[i]) {
            case "L":
              upperBound = Math.floor((upperBound + lowerBound) / 2);
              break;

            case "R":
              lowerBound = Math.ceil((upperBound + lowerBound) / 2);
              break;

            default:
              console.error(`'${e[i]}' is an unrecognised partition indicator`);
          }

          if (i === e.length - 1) {
            if (lowerBound !== upperBound) {
              console.error("Something went wrong :(");
            } else {
              column = lowerBound;
            }
          }
        }
      }

      return { rawSeatData: e, row, column, id: row * 8 + column };
    })
    .sort((a, b) => a.id - b.id);
};

const getHighestId = (seats) => {
  const highestId = Math.max(...seats.map((e) => e.id));
  return seats.find((e) => e.id === highestId);
};

const findEmptySeatId = (seats) => {
  let previous = null;
  for (let i = 0; i < seats.length; i++) {
    const current = seats[i];

    if (previous) {
      if (current.id !== previous.id + 1) {
        return previous.id + 1;
      }
    }

    previous = current;
  }
};
