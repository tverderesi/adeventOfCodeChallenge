var fs = require("fs");
var getInput = function (input) {
    return fs.readFileSync(input).toString().split("\n");
};
var shouldSum = function (cycle, cyclesArray, currentControlCycleIdx) {
    return cycle === cyclesArray[currentControlCycleIdx];
};
var sumSignals = function (x, cycle, sum, currentControlCycleIdx) {
    sum += x * cycle;
    currentControlCycleIdx++;
    return [sum, currentControlCycleIdx];
};
function SumSignalStrength(input, cyclesArray) {
    var _a, _b, _c;
    var inputArray = getInput(input);
    var cycle = 0;
    var x = 1;
    var currentControlCycleIdx = 0;
    var sum = 0;
    for (var i = 0; i < inputArray.length; i++) {
        if (inputArray[i] === "noop") {
            cycle++;
            shouldSum(cycle, cyclesArray, currentControlCycleIdx)
                ? (_a = sumSignals(x, cycle, sum, currentControlCycleIdx), sum = _a[0], currentControlCycleIdx = _a[1], _a)
                : "";
        }
        else if (inputArray[i].split(" ")[0] === "addx") {
            var addxValue = eval(inputArray[i].split(" ")[1]);
            cycle++;
            shouldSum(cycle, cyclesArray, currentControlCycleIdx)
                ? (_b = sumSignals(x, cycle, sum, currentControlCycleIdx), sum = _b[0], currentControlCycleIdx = _b[1], _b)
                : "";
            cycle++;
            shouldSum(cycle, cyclesArray, currentControlCycleIdx)
                ? (_c = sumSignals(x, cycle, sum, currentControlCycleIdx), sum = _c[0], currentControlCycleIdx = _c[1], _c)
                : "";
            x += addxValue;
        }
        else {
            throw new Error("Invalid input on item ".concat(i, ", ").concat(inputArray[i]));
        }
    }
    return sum;
}
function testSumSignalStrength() {
    var testValue = SumSignalStrength("test.txt", [20, 60, 100, 140, 180, 220]);
    return testValue === 13140
        ? "The test has passed. SumSignalStrength evaluated the correct value of 13140"
        : "Test failed. SumSignalStrength evaluated ".concat(testValue, " and the correct value should be 13140.");
}
// console.log(testSumSignalStrength());
// const inputValue = SumSignalStrength("input.txt", [20, 60, 100, 140, 180, 220]);
// console.log(
//   `The Sum of the Signal Strengts according to "input.txt" value is ${inputValue}`
// );
function displayCRT(input, width, height) {
    var inputArray = getInput(input);
    var cycle = 0;
    var x = 1;
    var position = 0;
    var output = "";
    function step() {
        cycle++;
        position = (cycle - 1) % width;
        output +=
            (position >= x - 1 && position <= x + 1 ? "#" : ".") +
                (position === 39 ? "\n" : "");
    }
    for (var i = 0; i < inputArray.length; i++) {
        var addX = 0;
        if (inputArray[i] === "noop") {
            step();
        }
        else if (inputArray[i].split(" ")[0] === "addx") {
            addX = eval(inputArray[i].split(" ")[1]);
            step();
            step();
            x += addX;
        }
        else {
            throw new Error("Invalid input on item ".concat(i, ", ").concat(inputArray[i]));
        }
    }
    return output;
}
function testDisplayCRT(log) {
    if (log === void 0) { log = true; }
    var testString = "##..##..##..##..##..##..##..##..##..##..\n###...###...###...###...###...###...###.\n####....####....####....####....####....\n#####.....#####.....#####.....#####.....\n######......######......######......####\n#######.......#######.......#######.....\n";
    var evaluatedTestString = displayCRT("test.txt", 40, 6);
    var successMessage = "The test ran successfully. testString evaluated the correct test string: ".concat(testString);
    var error = {
        testString: "",
        evaluatedTestString: "",
        position: 0,
    };
    var errors = [];
    if (testString !== evaluatedTestString) {
        for (var i = 0; i < evaluatedTestString.length; i++) {
            if (testString[i] !== evaluatedTestString[i]) {
                error.evaluatedTestString = evaluatedTestString[i];
                error.testString = testString[i];
                error.position = i;
                errors.push(error);
            }
        }
    }
    var success = evaluatedTestString === testString;
    if (success && log) {
        return console.log(successMessage);
    }
    else if (success && !log) {
        return successMessage;
    }
    else if (!success && log) {
        errors.map(function (error) {
            console.log("Test failed at position ".concat(error.position, ". It was expected ").concat(error.testString, " and the displayCRT returned ").concat(error.testString, "."));
        });
    }
    else if (!success && !log) {
        return errors;
    }
    else {
        throw new Error("Something went wrong. Error was inconclusive.");
    }
}
testDisplayCRT();
console.log(displayCRT("input.txt", 40, 6));
