const fs = require('fs');

fs.readFile('./Day7/Input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const validBagContents = getValidBagContents(data);

  // Part 1
  //console.log(findAllBagsThatCanContain('shiny gold', validBagContents).size);

  // Part 2
  console.log(getAllBagsInBag('shiny gold', validBagContents).size);
});

const getValidBagContents = (data) => {
  const lines = data.split('\r\n');

  const validBagContents = {};

  lines.forEach((e) => {
    const nameAndContents = e.split('contain').map((x) => x.trim());
    const bagName = nameAndContents[0].match(/^(.*) bags$/)[1];

    const contents = nameAndContents[1].split(',').map((x) => x.trim());

    const contentBags = [];

    contents.forEach((x) => {
      const contentBagNameMatch = x.match(
        /^([0-9]) (.*) bags?\.?$|no other bags./
      );

      if (contentBagNameMatch[2]) {
        contentBags.push({
          name: contentBagNameMatch[2],
          count: Number(contentBagNameMatch[1]),
        });
      }
    });

    validBagContents[bagName] = contentBags;
  });

  return validBagContents;
};

const findAllBagsThatCanContain = (searchFor, allBags) => {
  const bags = new Set();

  for (const [bagName, validContents] of Object.entries(allBags)) {
    if (validContents.includes(searchFor)) {
      bags.add(bagName);
    }
  }

  bags.forEach((e) =>
    findAllBagsThatCanContain(e, allBags).forEach((x) => bags.add(x))
  );

  return bags;
};

const getAllBagsInBagRecursively = (bagName, allBags) => {
  const bagsContained = new Set();

  allBags[bagName].forEach((x) => bagsContained.add(x));

  bagsContained.forEach((x) =>
    getAllBagsInBag(bagName, allBags).forEach((e) => bagsContained.add(e))
  );

  return bagsContained;
};

const getAllBagsInBag = (topLevelBag, allBags) => {
  let containedBagCount = 0;
  const toSearch = allBags[topLevelBag].map(
    (x) => new { multiplier: x.count, name: x.name }()
  );
  const objectEntries = Object.entries(allBags);
  const searched = new Set();

  for (let i = 0; i < objectEntries.length; i++) {
    const [bagName, bagsContained] = objectEntries[i];

    const searchResult = toSearch.find((x) => x.name === bagName);

    if (searchResult) {
      bagsContained.forEach((e) => {
        containedBagCount += e.count;

        if (!searched.has(e.name)) {
          toSearch.add(e.name);
        }
      });

      searched.add(bagName);
      toSearch.delete(bagName);

      i = -1;
    }
  }

  return containedBagCount;
};
