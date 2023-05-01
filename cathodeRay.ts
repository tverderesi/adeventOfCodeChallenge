const fs = require("fs");

const getInput = (input: string) => {
  return fs.readFileSync(input).toString().split("\n");
};

const shouldSum = (
  cycle: number,
  cyclesArray: number[],
  currentControlCycleIdx: number
) => {
  return cycle === cyclesArray[currentControlCycleIdx];
};

const sumSignals = (
  x: number,
  cycle: number,
  sum: number,
  currentControlCycleIdx: number
) => {
  sum += x * cycle;
  currentControlCycleIdx++;
  return [sum, currentControlCycleIdx];
};

function SumSignalStrength(input: string, cyclesArray: number[]) {
  const inputArray = getInput(input);
  let cycle = 0;
  let x = 1;
  let currentControlCycleIdx = 0;
  let sum = 0;
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] === "noop") {
      cycle++;
      shouldSum(cycle, cyclesArray, currentControlCycleIdx)
        ? ([sum, currentControlCycleIdx] = sumSignals(
            x,
            cycle,
            sum,
            currentControlCycleIdx
          ))
        : "";
    } else if (inputArray[i].split(" ")[0] === "addx") {
      const addxValue = eval(inputArray[i].split(" ")[1]);
      cycle++;
      shouldSum(cycle, cyclesArray, currentControlCycleIdx)
        ? ([sum, currentControlCycleIdx] = sumSignals(
            x,
            cycle,
            sum,
            currentControlCycleIdx
          ))
        : "";

      cycle++;
      shouldSum(cycle, cyclesArray, currentControlCycleIdx)
        ? ([sum, currentControlCycleIdx] = sumSignals(
            x,
            cycle,
            sum,
            currentControlCycleIdx
          ))
        : "";
      x += addxValue;
    } else {
      throw new Error(`Invalid input on item ${i}, ${inputArray[i]}`);
    }
  }
  return sum;
}

function testSumSignalStrength() {
  const testValue = SumSignalStrength("test.txt", [20, 60, 100, 140, 180, 220]);

  return testValue === 13140
    ? "The test has passed. SumSignalStrength evaluated the correct value of 13140"
    : `Test failed. SumSignalStrength evaluated ${testValue} and the correct value should be 13140.`;
}

console.log(testSumSignalStrength());

const inputValue = SumSignalStrength("input.txt", [20, 60, 100, 140, 180, 220]);
console.log(
  `The Sum of the Signal Strengts according to "input.txt" value is ${inputValue}`
);
