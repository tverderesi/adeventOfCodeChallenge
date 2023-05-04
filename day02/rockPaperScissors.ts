import { getInput, compareArrays } from "../common/utils";

const totalScore = (input: string) => {
  const roundScore = rpsScore(input);
  return roundScore.reduce((acc: number, curr: number) => {
    return (acc += curr);
  });
};

function rpsScore(input: string) {
  const gameArray = getInput(input);

  const oponentMoves = gameArray.map((play: string) => play[0]);

  const myMoves = gameArray.map((play: string) => play[2]);

  const moves = { A: "X", B: "Y", C: "Z" };
  const translatedOpponentMoves = oponentMoves.map((play: string) => {
    return eval(`moves['${play}']`);
  });

  const scores = { "2": 0, "1": 6, "0": 3, "-1": 0, "-2": 6 };
  //making sense of the diferences:
  //A rock 0, B paper 1, C Scissors 2
  // +2 -> loses (Scissors - Rock)
  // +1 -> wins (paper - rock, scissors - paper)
  // 0  -> draw
  // -1 -> loses (rock - paper, paper - scissors)
  // -2 -> wins (Rock - Scissors)

  const movePoints = { X: 1, Y: 2, Z: 3 };

  const roundScore = myMoves.map((move: string, idx: number) => {
    const roundDifference = (
      Object.values(moves).indexOf(move) -
      Object.values(moves).indexOf(translatedOpponentMoves[idx])
    ).toString();

    return eval(`scores['${roundDifference}'] + movePoints['${move}']`);
  });
  return roundScore;
}

function testRoundScore() {
  const correctValue = [8, 1, 6];
  const errors: any[] = [];
  const evalScore = rpsScore("test.txt");
  compareArrays(evalScore, correctValue).map((value: true | any[]) => {
    typeof value === "boolean"
      ? ""
      : errors.push(
          `Test failed at item ${value[3]}: rpsScore() returned ${value[1]}, but it should've returned ${value[2]}`
        );
  });

  return console.log(
    errors.length
      ? errors.map((error) => new Error(error))
      : `The passed successfully. rpsScore() returned the correct array of ${correctValue}.`
  );
}

function testTotalScore() {
  const correctScore = 15;
  const evalTotalScore = totalScore("test.txt");
  return console.log(
    evalTotalScore === correctScore
      ? `The passed successfully. totalScore() returned the correct total score: ${correctScore}.`
      : new Error(
          `Test failed. totalScore returned ${evalTotalScore}, but it should've returned ${correctScore}.`
        )
  );
}

const test = () => {
  testRoundScore();
  testTotalScore();
};
//got from stack overflow
if (typeof module !== "undefined" && require.main) {
  test();
  console.log(totalScore("input.txt"));
}
