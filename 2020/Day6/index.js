const fs = require("fs");

fs.readFile("./Day6/Input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Part 1
  // const distinctAnswers = getDistinctAnswers(data);
  // console.table(distinctAnswers);

  // console.log(addAllDistinctAnswers(distinctAnswers));

  // Part 2
  const commonAnswers = getCommonAnswers(data);
  console.table(commonAnswers);

  console.log(addAllCommonAnswers(commonAnswers));
});

const getDistinctAnswers = (data) => {
  const answerGroups = data.split("\n\n");

  let distinctAnswers = new Set();
  const result = [];

  answerGroups.forEach((e) => {
    e.split("\n").forEach((x) =>
      Array.from(x).forEach((c) => distinctAnswers.add(c))
    );
    result.push(distinctAnswers);
    distinctAnswers = new Set();
  });

  return result;
};

const addAllDistinctAnswers = (answers) => {
  let result = 0;

  answers.forEach((e) => (result += e.size));

  return result;
};

const addAllCommonAnswers = (answers) => {
  let result = 0;

  answers.forEach((e) => (result += e.length));

  return result;
};

const getCommonAnswers = (data) => {
  const result = [];
  let currentGroup;

  data.split("\n\n").forEach((e) => {
    const individualAnswers = e.split("\n");
    currentGroup = Array.from(individualAnswers[0]);

    individualAnswers.slice(1).forEach((x) => {
      const indexesToRemove = [];

      for (let i = 0; i < currentGroup.length; i++) {
        if (!x.includes(currentGroup[i])) {
          indexesToRemove.push(i);
        }
      }

      indexesToRemove.reverse().forEach((i) => {
        currentGroup.splice(i, 1);
      });
    });

    result.push(currentGroup);
  });

  return result;
};
