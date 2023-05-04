"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../common/utils");
var totalScore = function (input) {
    var roundScore = rpsScore(input);
    return roundScore.reduce(function (acc, curr) {
        return (acc += curr);
    });
};
function rpsScore(input) {
    var gameArray = (0, utils_1.getInput)(input);
    var oponentMoves = gameArray.map(function (play) { return play[0]; });
    var myMoves = gameArray.map(function (play) { return play[2]; });
    var moves = { A: "X", B: "Y", C: "Z" };
    var translatedOpponentMoves = oponentMoves.map(function (play) {
        return eval("moves['".concat(play, "']"));
    });
    var scores = { "2": 0, "1": 6, "0": 3, "-1": 0, "-2": 6 };
    //making sense of the diferences:
    //A rock 0, B paper 1, C Scissors 2
    // +2 -> loses (Scissors - Rock)
    // +1 -> wins (paper - rock, scissors - paper)
    // 0  -> draw
    // -1 -> loses (rock - paper, paper - scissors)
    // -2 -> wins (Rock - Scissors)
    var movePoints = { X: 1, Y: 2, Z: 3 };
    var roundScore = myMoves.map(function (move, idx) {
        var roundDifference = (Object.values(moves).indexOf(move) -
            Object.values(moves).indexOf(translatedOpponentMoves[idx])).toString();
        return eval("scores['".concat(roundDifference, "'] + movePoints['").concat(move, "']"));
    });
    return roundScore;
}
function testRoundScore() {
    var correctValue = [8, 1, 6];
    var errors = [];
    var evalScore = rpsScore("test.txt");
    (0, utils_1.compareArrays)(evalScore, correctValue).map(function (value) {
        typeof value === "boolean"
            ? ""
            : errors.push("Test failed at item ".concat(value[3], ": rpsScore() returned ").concat(value[1], ", but it should've returned ").concat(value[2]));
    });
    return console.log(errors.length
        ? errors.map(function (error) { return new Error(error); })
        : "The passed successfully. rpsScore() returned the correct array of ".concat(correctValue, "."));
}
function testTotalScore() {
    var correctScore = 15;
    var evalTotalScore = totalScore("test.txt");
    return console.log(evalTotalScore === correctScore
        ? "The passed successfully. totalScore() returned the correct total score: ".concat(correctScore, ".")
        : new Error("Test failed. totalScore returned ".concat(evalTotalScore, ", but it should've returned ").concat(correctScore, ".")));
}
var test = function () {
    testRoundScore();
    testTotalScore();
};
//got from stack overflow
if (typeof module !== "undefined" && !module.parent) {
    test();
    console.log(totalScore("input.txt"));
}
