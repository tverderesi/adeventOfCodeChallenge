"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInput = void 0;
var fs = require("fs");
var getInput = function (input) {
    return fs.readFileSync(input).toString().split("\n");
};
exports.getInput = getInput;
