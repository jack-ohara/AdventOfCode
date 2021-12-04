"use strict";
const { getRating } = require("./index");

test("returns correct thing", () => {
  const dataSet = ["011111111100", "100001011111", "011010010010"];

  const result = getRating(
    dataSet,
    (bit, mostCommonBit) => bit === mostCommonBit,
    (bit) => bit === "1"
  );

  expect(result).toBe("011111111100");
});
