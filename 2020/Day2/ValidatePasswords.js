const fs = require('fs');

fs.readFile('./Day2/Input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // const parsedData = parseRawData(data, parsePolicySolution1);
  const parsedData = parseRawData(data, parsePolicySolution2);

  // part1Solution(parsedData);
  part2Solution(parsedData);
});

const parseRawData = (fileText, parsePolicy) => {
  return fileText.split('\r\n').map((e) => {
    const [rawPolicy, password] = e.split(':').map((e) => e.trim());

    const policy = parsePolicy(rawPolicy);

    return { policy: policy, password: password };
  });
};

const parsePolicySolution1 = (data) => {
  const [range, targetedCharacter] = data.split(' ').map((e) => e.trim());

  const [min, max] = range.split('-');

  return {
    targetedCharacter: targetedCharacter,
    minimumAmount: min,
    maximumAmount: max,
  };
};

const parsePolicySolution2 = (data) => {
  const [range, targetedCharacter] = data.split(' ').map((e) => e.trim());

  const [indexOne, indexTwo] = range.split('-').map((e) => Number(e) - 1);

  return { targetedCharacter, indexOne, indexTwo };
};

const part1Solution = (data) => {
  let validPasswordCount = 0;

  for (let i = 0; i < data.length; i++) {
    const passwordData = data[i];

    const regex = new RegExp(
      `[^${passwordData.policy.targetedCharacter}]`,
      'g'
    );

    const characterCount = passwordData.password.replace(regex, '').length;

    if (
      characterCount >= passwordData.policy.minimumAmount &&
      characterCount <= passwordData.policy.maximumAmount
    ) {
      validPasswordCount++;
    }
  }

  console.log(`Valid passwords: ${validPasswordCount}`);
};

const part2Solution = (data) => {
  let validPasswordCount = 0;

  for (let i = 0; i < data.length; i++) {
    const passwordData = data[i];

    const indexOneMatch =
      passwordData.password[passwordData.policy.indexOne] ===
      passwordData.policy.targetedCharacter;
    const indexTwoMatch =
      passwordData.password[passwordData.policy.indexTwo] ===
      passwordData.policy.targetedCharacter;

    if (
      (indexOneMatch && !indexTwoMatch) ||
      (indexTwoMatch && !indexOneMatch)
    ) {
      validPasswordCount++;
    }
  }

  console.log(validPasswordCount);
};
