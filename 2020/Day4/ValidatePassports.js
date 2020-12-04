const fs = require('fs');

fs.readFile('./Day4/Input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const passports = getPassports(data);

  // Part 1
  console.log(getNumberOfValidPassports(passports));

  // Part 2
  // console.log(
  //   getNumberOfTreesHit(routeMap, 1, 1) *
  //     getNumberOfTreesHit(routeMap, 3, 1) *
  //     getNumberOfTreesHit(routeMap, 5, 1) *
  //     getNumberOfTreesHit(routeMap, 7, 1) *
  //     getNumberOfTreesHit(routeMap, 1, 2)
  // );
});

const getPassports = (passportData) => {
  const rawPassports = passportData.split('\r\n\r\n');

  return rawPassports.map((e) => {
    let passport = {};

    // console.log(e);
    // console.log(e.split(/\s=/));

    e.split(/\s+/).forEach((x) => {
      const keyAndValue = x.split(':');

      passport[keyAndValue[0]] = keyAndValue[1];
    });

    return passport;
  });
};

const getNumberOfValidPassports = (passports) => {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

  let numberOfValidPassports = 0;

  passports.forEach((p) => {
    let isValid = true;
    for (let i = 0; i < requiredFields.length; i++) {
      const fieldName = requiredFields[i];

      if (!(fieldName in p) || !validation[fieldName](p[fieldName])) {
        isValid = false;
        break;
      }
    }

    isValid && numberOfValidPassports++;
  });

  return numberOfValidPassports;
};

const validation = {
  byr: (yearString) => {
    if (!yearString) {
      return false;
    }

    const year = Number(yearString);
    return year >= 1920 && year <= 2002;
  },
  iyr: (yearString) => {
    if (!yearString) {
      return false;
    }
    const year = Number(yearString);
    return year >= 2010 && year <= 2020;
  },
  eyr: (yearString) => {
    if (!yearString) {
      return false;
    }
    const year = Number(yearString);
    return year >= 2020 && year <= 2030;
  },
  hgt: (heightString) => {
    if (!heightString) {
      return false;
    }

    const unit = heightString.slice(Math.max(heightString.length - 2, 1));
    const value = heightString.substr(0, heightString.indexOf(unit));

    if (!value) {
      return false;
    }

    const valueNumber = Number(value);

    switch (unit) {
      case 'cm':
        return valueNumber >= 150 && valueNumber <= 193;

      case 'in':
        return valueNumber >= 59 && valueNumber <= 76;

      default:
        return false;
    }
  },
  hcl: (hairColourString) => {
    if (!hairColourString) {
      return false;
    }

    return hairColourString.match(/^#([0-9]|[a-f]){6}$/);
  },
  ecl: (eyeColourString) => {
    if (!eyeColourString) {
      return false;
    }

    const validValues = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

    return validValues.includes(eyeColourString);
  },
  pid: (pidString) => {
    if (!pidString) {
      return false;
    }

    return pidString.match(/^[0-9]{9}$/);
  },
  cid: (cidString) => {
    return true;
  },
};
