const fs = require("fs");

export const getInput = (input: string) => {
  return fs.readFileSync(input).toString().split("\n");
};

export const compareArrays = (arrA: any[], arrB: any[]) => {
  return arrA.map((item, idx) => {
    return item === arrB[idx] ? true : [false, item, arrB[idx], idx];
  });
};
