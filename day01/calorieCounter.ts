import { getInput } from "../common/utils";

function mostCalories(input: string) {
  const calories = getInput(input);
  type elfType = {
    elfNumber: number;
    calories: number;
  };

  let elfNumber = 1;
  let calorieSum = 0;
  let elves: elfType[] = [];
  let highestElf: elfType = { elfNumber: 0, calories: 0 };

  for (let i = 0; i <= calories.length; i++) {
    let calorie = eval(calories[i]);

    if (calorie) {
      calorieSum += calorie;
    } else {
      elves.push({ elfNumber: elfNumber, calories: calorieSum });
      if (calorieSum > highestElf.calories) {
        highestElf.elfNumber = elfNumber;
        highestElf.calories = calorieSum;
      }
      calorieSum = 0;
      elfNumber++;
    }
  }
  const onlyCaloriesArray: number[] = [];
  elves.map((elf) => onlyCaloriesArray.push(elf.calories));

  console.log(
    onlyCaloriesArray
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((acc, curr) => {
        return (acc += curr);
      })
  );
  return highestElf;
}

function sumTopCalories(input: string, elvesNumber: number) {
  const calories = getInput(input);
  const onlyCaloriesArray: number[] = [];

  let calorieSum = 0;

  for (let i = 0; i <= calories.length; i++) {
    let calorie = eval(calories[i]);

    if (calorie) {
      calorieSum += calorie;
    } else {
      onlyCaloriesArray.push(calorieSum);
      calorieSum = 0;
    }
  }
  const biggestCalories = onlyCaloriesArray
    .sort((a, b) => b - a)
    .slice(0, elvesNumber)
    .reduce((acc, curr) => {
      return (acc += curr);
    });

  return biggestCalories;
}

const testCalories = () => {
  const caloriesOutput = mostCalories("test.txt");

  return caloriesOutput.calories === 24000 && caloriesOutput.elfNumber === 4
    ? `The test run successfully and mostCalories returned the correct value: 24000 kcal, carried by the 4th elf.`
    : `The test failed. mostCalories found ${caloriesOutput.calories}, carried by Elf number ${caloriesOutput.elfNumber}. It should have found 24000 kcal carried by the 4th elf. `;
};
if (typeof module !== "undefined" && !module.parent) {
  console.log(testCalories());
}

console.log(mostCalories("input.txt"));
console.log(sumTopCalories("input.txt", 3));
