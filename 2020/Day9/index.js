const fs = require('fs');

fs.readFile('./Day9/Input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const parsedData = parseData(data);

  // Part 1
  const numberThatDoesNotMatchPattern = findFirstNumberThatDoesNotMatchPattern(
    parsedData
  );

  // Part 2
  const contiguousSet = getContiguousSetThatAddTo(
    numberThatDoesNotMatchPattern,
    parsedData
  );
  console.log(Math.min(...contiguousSet) + Math.max(...contiguousSet));
});

const parseData = (data) => {
  return data.split('\r\n').map((e) => Number(e));
};

const findFirstNumberThatDoesNotMatchPattern = (data) => {
  for (let i = 25; i < data.length; i++) {
    const target = data[i];
    let last25Numbers = data.slice(i - 25, i);

    last25Numbers = last25Numbers.filter((x) => x < target);

    let found2ValidNumbers = false;

    for (let j = 0; j < last25Numbers.length; j++) {
      const candidate = last25Numbers[j];

      const secondNumber = last25Numbers.find((x) => x + candidate === target);

      if (secondNumber && secondNumber !== candidate) {
        found2ValidNumbers = true;
        break;
      }
    }

    if (!found2ValidNumbers) {
      return target;
    }
  }
};

const getContiguousSetThatAddTo = (target, data) => {
  for (let i = 0; i < data.length; i++) {
    let sum = data[i];
    let j = i + 1;

    while (sum < target) {
      sum += data[j];
      j++;
    }

    if (sum === target) {
      return data.slice(i, j + 1);
    }
  }
};
