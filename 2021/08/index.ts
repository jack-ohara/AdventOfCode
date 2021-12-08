import { readFileSync } from "fs";

let dataEntries: entry[] = readFileSync("./input.txt", "utf-8")
    .split("\n")
    .filter((e) => e)
    .map(line => {
        const [rawSignals, rawOutputs] = line.split("|");

        return { signalPaterns: rawSignals.split(" ").filter(s => s).map(s => s.split("")), outputValues: rawOutputs.split(" ").filter(s => s) };
    });

interface entry {
    signalPaterns: string[][];
    outputValues: string[];
}

interface EntrySegmentMap {
    [key: string]: string | undefined;
};

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

function partOne(): number {
    let oneFourSevenEightCount = 0;

    for (const dataEntry of dataEntries) {
        oneFourSevenEightCount += dataEntry.outputValues
            .filter(v =>
                v.length === segmentMap[1].length ||
                v.length === segmentMap[4].length ||
                v.length === segmentMap[7].length ||
                v.length === segmentMap[8].length)
            .length;
    }

    return oneFourSevenEightCount;
}

function partTwo(): number {
    let total = 0;
    for (const dataEntry of dataEntries) {

        const entrySegmentMap: EntrySegmentMap = {
            'a': undefined,
            'b': undefined,
            'c': undefined,
            'd': undefined,
            'e': undefined,
            'f': undefined,
            'g': undefined
        };

        const one = dataEntry.signalPaterns.find(p => p.length === segmentMap[1].length)
        const four = dataEntry.signalPaterns.find(p => p.length === segmentMap[4].length);
        const seven = dataEntry.signalPaterns.find(p => p.length === segmentMap[7].length);
        const eight = dataEntry.signalPaterns.find(p => p.length === segmentMap[8].length);

        entrySegmentMap['a'] = seven?.find(s => !one?.includes(s));

        const bAndD = four?.filter(s => !one?.includes(s));

        const five = dataEntry.signalPaterns.find(p => p.length === segmentMap[5].length && bAndD?.every(e => p.includes(e)));

        entrySegmentMap['g'] = five?.find(s => s !== entrySegmentMap['a'] && !bAndD?.includes(s) && !one?.includes(s));
        entrySegmentMap['f'] = five?.find(s => s !== entrySegmentMap['a'] && s !== entrySegmentMap['g'] && !bAndD?.includes(s));
        entrySegmentMap['c'] = one?.find(s => s !== entrySegmentMap['f']);
        entrySegmentMap['e'] = eight?.find(s => s !== entrySegmentMap['a'] && s !== entrySegmentMap['c'] && s !== entrySegmentMap['f'] && s !== entrySegmentMap['g'] && !bAndD?.includes(s));

        const twoAndThree = dataEntry.signalPaterns.filter(e => e.length === segmentMap[2].length && !e.every(x => five?.includes(x)));

        entrySegmentMap['d'] = twoAndThree[0].find(s => s !== entrySegmentMap['a'] && s !== entrySegmentMap['c'] && s !== entrySegmentMap['e'] && s !== entrySegmentMap['f'] && s !== entrySegmentMap['g']);
        entrySegmentMap['b'] = bAndD?.find(x => x !== entrySegmentMap['d']);

        total += parseInt(dataEntry.outputValues.map(s => getNumberFromValues(s.split(""), entrySegmentMap)).join(""));
    }

    return total;
}

function getNumberFromValues(values: string[], entrySegmentMap: EntrySegmentMap): string {
    const mappedValues = values.map(x => Object.entries(entrySegmentMap).find(e => e[1] === x)?.at(0))

    if (mappedValues.some(x => !x)) throw new Error("oh shit");

    const char = Object.entries(segmentMap).find(arr => arr[1].every(x => mappedValues.includes(x)) && mappedValues.every(x => !x || arr[1].includes(x)))?.at(0);

    if (!char || Array.isArray(char)) throw new Error("oh shit");

    return char;
}

console.log(partOne());
console.log(partTwo());