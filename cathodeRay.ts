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

// console.log(testSumSignalStrength());

// const inputValue = SumSignalStrength("input.txt", [20, 60, 100, 140, 180, 220]);
// console.log(
//   `The Sum of the Signal Strengts according to "input.txt" value is ${inputValue}`
// );

function displayCRT(input: string, width: number, height: number) {
  const inputArray = getInput(input);
  let cycle = 0;
  let x = 1;
  let position = 0;
  let output = "";

  function step() {
    cycle++;
    position = (cycle - 1) % width;
    output +=
      (position >= x - 1 && position <= x + 1 ? "#" : ".") +
      (position === 39 ? "\n" : "");
  }
  for (let i = 0; i < inputArray.length; i++) {
    let addX = 0;
    if (inputArray[i] === "noop") {
      step();
    } else if (inputArray[i].split(" ")[0] === "addx") {
      addX = eval(inputArray[i].split(" ")[1]);
      step();
      step();
      x += addX;
    } else {
      throw new Error(`Invalid input on item ${i}, ${inputArray[i]}`);
    }
  }

  return output;
}

function testDisplayCRT(log = true) {
  type errorType = {
    testString: string;
    evaluatedTestString: string;
    position: number;
  };
  const testString = `##..##..##..##..##..##..##..##..##..##..\n###...###...###...###...###...###...###.\n####....####....####....####....####....\n#####.....#####.....#####.....#####.....\n######......######......######......####\n#######.......#######.......#######.....\n`;
  const evaluatedTestString = displayCRT("test.txt", 40, 6);

  const successMessage = `The test ran successfully. testString evaluated the correct test string: ${testString}`;
  const error: errorType = {
    testString: "",
    evaluatedTestString: "",
    position: 0,
  };

  const errors: errorType[] = [];
  if (testString !== evaluatedTestString) {
    for (let i = 0; i < evaluatedTestString.length; i++) {
      if (testString[i] !== evaluatedTestString[i]) {
        error.evaluatedTestString = evaluatedTestString[i];
        error.testString = testString[i];
        error.position = i;

        errors.push(error);
      }
    }
  }

  const success = evaluatedTestString === testString;

  if (success && log) {
    return console.log(successMessage);
  } else if (success && !log) {
    return successMessage;
  } else if (!success && log) {
    errors.map((error) => {
      console.log(
        `Test failed at position ${error.position}. It was expected ${error.testString} and the displayCRT returned ${error.testString}.`
      );
    });
  } else if (!success && !log) {
    return errors;
  } else {
    throw new Error("Something went wrong. Error was inconclusive.");
  }
}

testDisplayCRT();

console.log(displayCRT("input.txt", 40, 6));
