Overview

This repository contains an interactive Sudoku game implemented in JavaScript and p5.js. The game uses a pre-loaded CSV file with various Sudoku puzzles and their solutions, enabling the user to play and interactively solve these puzzles. Besides manual interaction, there are options to view the puzzle solution, change to a different puzzle, reset the current puzzle, or validate the user's solution.

Features

 Sudoku Grid

 The game features a 9x9 Sudoku grid rendered on an HTML canvas, mimicking the traditional Sudoku game board. Each cell in the grid can contain a digit from 1 to 9, or it can be left empty (denoted by 0) for the player to fill.

 CSV-based Puzzles

 The game reads a CSV file containing multiple Sudoku puzzles and their respective solutions. Each puzzle can be accessed sequentially by the player, creating a diverse gaming experience.

 User Interaction

 The player can fill any empty cell on the board by clicking it and pressing a number key. There is also visual feedback for selected cells to enhance the user experience.

 Puzzle Navigation

 Buttons are provided to navigate between different puzzles. The player can move to the next or previous puzzle, or reset the current puzzle to its initial state.

 Solution Checking & Display

 Players can check their solution against the preloaded correct one at any point in the game. If the solution is incorrect, an alert message will appear. On completing a puzzle correctly, the player receives a congratulatory message.

 Furthermore, the player can view the correct solution by clicking the 'Show Solution' button. This feature is particularly useful for players who want to verify their answer or see the correct solution for a puzzle they find too difficult.
