"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareArrays = exports.getInput = void 0;
var fs = require("fs");
var getInput = function (input) {
    return fs.readFileSync(input).toString().split("\n");
};
exports.getInput = getInput;
var compareArrays = function (arrA, arrB) {
    return arrA.map(function (item, idx) {
        return item === arrB[idx] ? true : [false, item, arrB[idx], idx];
    });
};
exports.compareArrays = compareArrays;
