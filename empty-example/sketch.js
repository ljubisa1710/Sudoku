const fileName = 'small_sample.csv';
let csvString;
let csvArr;
let solutionVisible = false;
let selectedPuzzle = 0;

let grid = [];
let csvArray;

let selectedRow = -1;
let selectedCol = -1;

const w = 400
const l = 400
const cellSize = w / 9;

function preload() {
  const fileName = 'small_sample.csv';
  loadStrings(fileName, (data) => {
    csvArray = data.slice(1).map(row => {
      const [puzzle, solution] = row.split(',');
      return { puzzle: puzzle.split('').map(Number), solution: solution.split('').map(Number) };
    });
    console.log(csvArray);
    grid = csvArray[selectedPuzzle].puzzle.map((_, i) => csvArray[selectedPuzzle].puzzle.slice(i * 9, (i + 1) * 9));
    console.log(grid);
  });
}

function setup() {
  createCanvas(400, 400);
  background(255);
  window.addEventListener("keydown", handleKeyPress);

  // Draw the grid
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const value = grid[i][j];
      if (value !== 0) {
        fill(255, 0, 0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text(value, j * cellSize + cellSize / 2, i * cellSize + cellSize / 2);
      }
    }
  }

  // Add button to show/hide solution
  const solutionButton = createButton('Show Solution');
  solutionButton.position(10, 450);
  solutionButton.mousePressed(() => {
    solutionVisible = !solutionVisible;
    solutionButton.html(solutionVisible ? 'Hide Solution' : 'Show Solution');
    redraw();
  });

  // Add button to select next puzzle
  const nextButton = createButton('Next Puzzle');
  nextButton.position(10, 390);
  nextButton.mousePressed(() => {
    selectedPuzzle = (selectedPuzzle + 1) % csvArray.length;
    grid = csvArray[selectedPuzzle].puzzle.map((_, i) => csvArray[selectedPuzzle].puzzle.slice(i * 9, (i + 1) * 9));
    solutionVisible = false;
    csvArray = data.slice(1).map(row => {
      const [puzzle, solution] = row.split(',');
      return { puzzle: puzzle.split('').map(Number), solution: solution.split('').map(Number) };
    }); // added this line
    redraw();
  });

  // Add button to select next puzzle
  const prevButton = createButton('Previous Puzzle');
  prevButton.position(10, 360);
  prevButton.mousePressed(() => {
    selectedPuzzle = (selectedPuzzle - 1) % csvArray.length;
    grid = csvArray[selectedPuzzle].puzzle.map((_, i) => csvArray[selectedPuzzle].puzzle.slice(i * 9, (i + 1) * 9));
    solutionVisible = false;
    csvArray = data.slice(1).map(row => {
      const [puzzle, solution] = row.split(',');
      return { puzzle: puzzle.split('').map(Number), solution: solution.split('').map(Number) };
    }); // added this line
    redraw();
  });

  const resetButton = createButton('Reset Puzzle');
  resetButton.position(10, 330);
  resetButton.mousePressed(() => {
    grid = csvArray[selectedPuzzle].puzzle.map((_, i) => csvArray[selectedPuzzle].puzzle.slice(i * 9, (i + 1) * 9));
    solutionVisible = false;
    csvArray = data.slice(1).map(row => {
      const [puzzle, solution] = row.split(',');
      return { puzzle: puzzle.split('').map(Number), solution: solution.split('').map(Number) };
    }); // added this line
    redraw();
  });

  const checkButton = createButton('Check Solution');
  checkButton.position(10, 420);
  checkButton.mousePressed(() => {
    checkSolution();
  });
}

function checkSolution() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const value = grid[i][j];
      if (value !== csvArray[selectedPuzzle].solution[i * 9 + j]) {
        alert('Incorrect solution');
        return;
      }
    }
  }
  alert('Congratulations, you solved the puzzle!');
}


function mouseClicked() {
  let col = Math.floor(mouseX / cellSize);
  let row = Math.floor(mouseY / cellSize);
  if (col >= 0 && col <= 8 && row >= 0 && row <= 8) {
    selectedCol = col;
    selectedRow = row;
    redraw();
  }
}

function handleKeyPress(event) {
  if (selectedRow === -1 || selectedCol === -1) {
    return;
  }
  let number = parseInt(event.key);
  if (isNaN(number) || number === 0) {
    return;
  }
  if (csvArray[selectedPuzzle].puzzle[selectedRow * 9 + selectedCol] === 0) {
    grid[selectedRow][selectedCol] = number;
  }
  redraw();
}

function csvToArray(str, delimiter = ",") {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  // return the array
  return arr;
}

function drawGrid() {
  const cellSize = width / 9;
  strokeWeight(1);
  stroke(0);
  for (let i = 0; i < 10; i++) {
    line(i * cellSize, 0, i * cellSize, height);
    line(0, i * cellSize, width, i * cellSize);
  }
}

function fillGrid() {
  const cellSize = width / 9;
  textSize(32);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const value = grid[i][j];
      if (value !== 0) {
        if (csvArray[selectedPuzzle].puzzle[i * 9 + j] !== 0) {
          fill(0, 0, 255);
        } else if (solutionVisible) {
          if (value === csvArray[selectedPuzzle].solution[i * 9 + j]) {
            fill(0, 255, 0);
          } else {
            fill(255, 0, 0);
          }
        } else {
          fill(0);
        }
        text(value, j * cellSize + cellSize / 2, i * cellSize + cellSize / 2);
      } else {
        const solutionValue = csvArray[selectedPuzzle].solution[i * 9 + j];
        if (solutionVisible && solutionValue !== 0) {
          fill(0);
          text(solutionValue, j * cellSize + cellSize / 2, i * cellSize + cellSize / 2);
        }
      }
    }
  }
}

function draw() {
  background(220);
  drawGrid();
  fillGrid();
}