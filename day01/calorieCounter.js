"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getInput_1 = require("../common/getInput");
function mostCalories(input) {
    var calories = (0, getInput_1.getInput)(input);
    var elfNumber = 1;
    var calorieSum = 0;
    var elves = [];
    var highestElf = { elfNumber: 0, calories: 0 };
    for (var i = 0; i <= calories.length; i++) {
        var calorie = eval(calories[i]);
        if (calorie) {
            calorieSum += calorie;
        }
        else {
            elves.push({ elfNumber: elfNumber, calories: calorieSum });
            if (calorieSum > highestElf.calories) {
                highestElf.elfNumber = elfNumber;
                highestElf.calories = calorieSum;
            }
            calorieSum = 0;
            elfNumber++;
        }
    }
    var onlyCaloriesArray = [];
    elves.map(function (elf) { return onlyCaloriesArray.push(elf.calories); });
    console.log(onlyCaloriesArray
        .sort(function (a, b) { return b - a; })
        .slice(0, 3)
        .reduce(function (acc, curr) {
        return (acc += curr);
    }));
    return highestElf;
}
function sumTopCalories(input, elvesNumber) {
    var calories = (0, getInput_1.getInput)(input);
    var onlyCaloriesArray = [];
    var calorieSum = 0;
    for (var i = 0; i <= calories.length; i++) {
        var calorie = eval(calories[i]);
        if (calorie) {
            calorieSum += calorie;
        }
        else {
            onlyCaloriesArray.push(calorieSum);
            calorieSum = 0;
        }
    }
    var biggestCalories = onlyCaloriesArray
        .sort(function (a, b) { return b - a; })
        .slice(0, elvesNumber)
        .reduce(function (acc, curr) {
        return (acc += curr);
    });
    return biggestCalories;
}
var testCalories = function () {
    var caloriesOutput = mostCalories("test.txt");
    return caloriesOutput.calories === 24000 && caloriesOutput.elfNumber === 4
        ? "The test run successfully and mostCalories returned the correct value: 24000 kcal, carried by the 4th elf."
        : "The test failed. mostCalories found ".concat(caloriesOutput.calories, ", carried by Elf number ").concat(caloriesOutput.elfNumber, ". It should have found 24000 kcal carried by the 4th elf. ");
};
console.log(testCalories());
console.log(mostCalories("input.txt"));
console.log(sumTopCalories("input.txt", 3));
