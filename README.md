# Advent of Code 2022

This repository contains my solutions for the Advent of Code 2022 challenge. Advent of Code is an annual coding challenge that consists of daily programming puzzles for the month of December. Each day presents a new puzzle, and completing it grants one star. The challenge becomes more difficult as the days progress, testing various programming concepts and problem-solving skills.

## Table of Contents

- [Day 01: Calorie Counting](#day-01-calorie-counting)
- [Day 02: Rock Paper Scissors](#day-02-rock-paper-scissors)

- [Day 10: Puzzle Title](#day-10-puzzle-title)
- ...

## Day 01: Calorie Counting

### Problem Description
Santa's reindeer typically eat regular reindeer food, but they need a lot of magical energy to deliver presents on Christmas. For that, their favorite snack is a special type of star fruit that only grows deep in the jungle. The Elves have brought you on their annual expedition to the grove where the fruit grows. The task for today is to find the Elf carrying the most Calories and determine the total Calories carried by the top three Elves.

### Part One

Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?

### Part Two

Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?

### Solution Approach

For this problem, I started by parsing the input and separating the inventory of each Elf. Then, I calculated the total calories carried by each Elf and identified the Elf with the highest calorie count. Finally, I determined the total calories carried by the top three Elves by summing their calorie counts.

## Day 02: Rock Paper Scissors

### Problem Description
The Elves begin to set up camp on the beach. To decide whose tent gets to be closest to the snack storage, a giant Rock Paper Scissors tournament is already in progress. Rock Paper Scissors is a game between two players. Each game contains many rounds; in each round, the players each simultaneously choose one of Rock, Paper, or Scissors using a hand shape. Then, a winner for that round is selected: Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock. If both players choose the same shape, the round instead ends in a draw. Appreciative of your help yesterday, one Elf gives you an encrypted strategy guide (your puzzle input) that they say will be sure to help you win.

### Part One

The strategy guide provides the opponent's move and recommends your move to win or draw. The goal is to calculate the total score you would get if you were to follow the strategy guide. The score for a single round is determined by the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).

### Part Two

The second column of the strategy guide indicates how the round needs to end: X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win. In Part Two, the goal is to determine what shape to choose in order to fulfill the desired outcome indicated in the strategy guide.

### Solution Approach
To solve this problem, I parsed the input and extracted the opponent's moves and the recommended moves from the strategy guide. I then mapped the moves to their corresponding outcomes (win, lose, or draw) and calculated the scores for each round based on the chosen move and the outcome. Finally, I summed up the scores to calculate the total score according to the strategy guide.

