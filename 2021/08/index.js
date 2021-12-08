"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
let dataEntries = (0, fs_1.readFileSync)("./input.txt", "utf-8")
    .split("\n")
    .filter((e) => e)
    .map(line => {
    const [rawSignals, rawOutputs] = line.split("|");
    return { signalPaterns: rawSignals.split(" ").filter(s => s).map(s => s.split("")), outputValues: rawOutputs.split(" ").filter(s => s) };
});
;
const segmentMap = {
    0: ['a', 'b', 'c', 'e', 'f', 'g'],
    1: ['c', 'f'],
    2: ['a', 'c', 'd', 'e', 'g'],
    3: ['a', 'c', 'd', 'f', 'g'],
    4: ['b', 'c', 'd', 'f'],
    5: ['a', 'b', 'd', 'f', 'g'],
    6: ['a', 'b', 'd', 'e', 'f', 'g'],
    7: ['a', 'c', 'f'],
    8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    9: ['a', 'b', 'c', 'd', 'f', 'g'],
};
function partOne() {
    let oneFourSevenEightCount = 0;
    for (const dataEntry of dataEntries) {
        oneFourSevenEightCount += dataEntry.outputValues
            .filter(v => v.length === segmentMap[1].length ||
            v.length === segmentMap[4].length ||
            v.length === segmentMap[7].length ||
            v.length === segmentMap[8].length)
            .length;
    }
    return oneFourSevenEightCount;
}
function partTwo() {
    let total = 0;
    for (const dataEntry of dataEntries) {
        const entrySegmentMap = {
            'a': undefined,
            'b': undefined,
            'c': undefined,
            'd': undefined,
            'e': undefined,
            'f': undefined,
            'g': undefined
        };
        const one = dataEntry.signalPaterns.find(p => p.length === segmentMap[1].length);
        const four = dataEntry.signalPaterns.find(p => p.length === segmentMap[4].length);
        const seven = dataEntry.signalPaterns.find(p => p.length === segmentMap[7].length);
        const eight = dataEntry.signalPaterns.find(p => p.length === segmentMap[8].length);
        entrySegmentMap['a'] = seven === null || seven === void 0 ? void 0 : seven.find(s => !(one === null || one === void 0 ? void 0 : one.includes(s)));
        const bAndD = four === null || four === void 0 ? void 0 : four.filter(s => !(one === null || one === void 0 ? void 0 : one.includes(s)));
        const five = dataEntry.signalPaterns.find(p => p.length === segmentMap[5].length && (bAndD === null || bAndD === void 0 ? void 0 : bAndD.every(e => p.includes(e))));
        entrySegmentMap['g'] = five === null || five === void 0 ? void 0 : five.find(s => s !== entrySegmentMap['a'] && !(bAndD === null || bAndD === void 0 ? void 0 : bAndD.includes(s)) && !(one === null || one === void 0 ? void 0 : one.includes(s)));
        entrySegmentMap['f'] = five === null || five === void 0 ? void 0 : five.find(s => s !== entrySegmentMap['a'] && s !== entrySegmentMap['g'] && !(bAndD === null || bAndD === void 0 ? void 0 : bAndD.includes(s)));
        entrySegmentMap['c'] = one === null || one === void 0 ? void 0 : one.find(s => s !== entrySegmentMap['f']);
        entrySegmentMap['e'] = eight === null || eight === void 0 ? void 0 : eight.find(s => s !== entrySegmentMap['a'] && s !== entrySegmentMap['c'] && s !== entrySegmentMap['f'] && s !== entrySegmentMap['g'] && !(bAndD === null || bAndD === void 0 ? void 0 : bAndD.includes(s)));
        const twoAndThree = dataEntry.signalPaterns.filter(e => e.length === segmentMap[2].length && !e.every(x => five === null || five === void 0 ? void 0 : five.includes(x)));
        entrySegmentMap['d'] = twoAndThree[0].find(s => s !== entrySegmentMap['a'] && s !== entrySegmentMap['c'] && s !== entrySegmentMap['e'] && s !== entrySegmentMap['f'] && s !== entrySegmentMap['g']);
        entrySegmentMap['b'] = bAndD === null || bAndD === void 0 ? void 0 : bAndD.find(x => x !== entrySegmentMap['d']);
        total += parseInt(dataEntry.outputValues.map(s => getNumberFromValues(s.split(""), entrySegmentMap)).join(""));
    }
    return total;
}
function getNumberFromValues(values, entrySegmentMap) {
    var _a;
    const mappedValues = values.map(x => { var _a; return (_a = Object.entries(entrySegmentMap).find(e => e[1] === x)) === null || _a === void 0 ? void 0 : _a.at(0); });
    if (mappedValues.some(x => !x))
        throw new Error("oh shit");
    const char = (_a = Object.entries(segmentMap).find(arr => arr[1].every(x => mappedValues.includes(x)) && mappedValues.every(x => !x || arr[1].includes(x)))) === null || _a === void 0 ? void 0 : _a.at(0);
    if (!char || Array.isArray(char))
        throw new Error("oh shit");
    return char;
}
console.log(partOne());
console.log(partTwo());
