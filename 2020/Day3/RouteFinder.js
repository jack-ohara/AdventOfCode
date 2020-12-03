const fs = require('fs');

fs.readFile('./Day3/Input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const routeMap = parseRawData(data);

  // Part 1
  // console.log(getNumberOfTreesHit(3, 1));

  // Part 2
  console.log(
    getNumberOfTreesHit(routeMap, 1, 1) *
      getNumberOfTreesHit(routeMap, 3, 1) *
      getNumberOfTreesHit(routeMap, 5, 1) *
      getNumberOfTreesHit(routeMap, 7, 1) *
      getNumberOfTreesHit(routeMap, 1, 2)
  );
});

const parseRawData = (rawData) => {
  return rawData.split('\r\n');
};

const getNumberOfTreesHit = (routeMap, xIncrease, yIncrease) => {
  let numberOfHitTress = 0;

  let xIndex = 0;

  for (var i = 0; i < routeMap.length; i += yIncrease) {
    if (routeMap[i][xIndex] === '#') {
      numberOfHitTress++;
    }

    const nextXIndex = xIndex + xIncrease;

    xIndex =
      nextXIndex > routeMap[i].length - 1
        ? nextXIndex - routeMap[i].length
        : nextXIndex;
  }

  return numberOfHitTress;
};
