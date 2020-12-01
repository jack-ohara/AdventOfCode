const fs = require('fs');

fs.readFile('./ExpenseReportInput.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  //part1Solution(data);
  part2Solution(data);
});

const part1Solution = (data) => {
  const numbers = data.split('\r\n').map((e) => Number(e));

  for (let i = 0; i < numbers.length; i++) {
    const lhs = numbers[i];

    for (let j = i + 1; j < numbers.length; j++) {
      const rhs = numbers[j];

      if (lhs + rhs === 2020) {
        console.log(`LHS: ${lhs}, RHS: ${rhs}`);
        console.log(`${lhs} * ${rhs} = ${lhs * rhs}`);
        return;
      }
    }
  }
};

const part2Solution = (data) => {
  const numbers = data.split('\r\n').map((e) => Number(e));

  for (let i = 0; i < numbers.length; i++) {
    const first = numbers[i];

    for (let j = i + 1; j < numbers.length; j++) {
      const second = numbers[j];

      for (let k = j + 1; k < numbers.length; k++) {
        const third = numbers[k];

        if (first + second + third === 2020) {
          console.log(`First: ${first}, Second: ${second}, Third: ${third}`);
          console.log(
            `${first} * ${second} * ${third} = ${first * second * third}`
          );
          return;
        }
      }
    }
  }
};
