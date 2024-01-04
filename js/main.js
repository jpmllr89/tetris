document.addEventListener("DOMContentLoaded", () => {
  const tetrisRow = 200;
  const tetrisWidth = 10;
  const grid = document.querySelector(".grid");
  const nextBlockGrid = document.querySelector(".nextBlockGrid");
  const scoreDisplay = document.querySelector("#score");
  const startBtn = document.querySelector("#start");
  const playerNameInput = document.querySelector("#playerName");
  const gameStatusContainer = document.querySelector("#gameStatusContainer");
  const highScore = document.querySelector("#highScore");
  let playerName = "";
  let highScores = [];
  let nextRandom = 0;
  let score = 0;
  let timerId;
  let isgameOver = false;
  let gameStatus = "pre game";
  let gamesPlayed = 0;

  // Making Grid
  for (let i = 0; i < tetrisRow; i++) {
    const tetrisBlock = document.createElement("div");
    grid.appendChild(tetrisBlock);
  }

  // Here we will make the taken blocks
  for (let i = 0; i < 10; i++) {
    const tetrisBlock = document.createElement("div");
    tetrisBlock.classList.add("taken");
    grid.appendChild(tetrisBlock);
  }

  // Here we will make the next block grid
  for (let i = 0; i < 16; i++) {
    const tetrisBlock = document.createElement("div");
    nextBlockGrid.appendChild(tetrisBlock);
  }

  let tetrisSquares = Array.from(document.querySelectorAll(".grid div"));
  console.log(tetrisSquares);

  // const newPosition = () =>{
  //   return Math.floor(Math.random() * (tetrisWidth - blockWidth));
  // }

  // Here we will make the tetris blocks
  const lTetrisBlock = [
    [1, tetrisWidth + 1, tetrisWidth * 2 + 1, 2],
    [tetrisWidth, tetrisWidth + 1, tetrisWidth + 2, tetrisWidth * 2 + 2],
    [1, tetrisWidth + 1, tetrisWidth * 2 + 1, tetrisWidth * 2],
    [tetrisWidth, tetrisWidth * 2, tetrisWidth * 2 + 1, tetrisWidth * 2 + 2],
  ];

  const zTetrisBlock = [
    [0, tetrisWidth, tetrisWidth + 1, tetrisWidth * 2 + 1],
    [tetrisWidth + 1, tetrisWidth + 2, tetrisWidth * 2, tetrisWidth * 2 + 1],
    [0, tetrisWidth, tetrisWidth + 1, tetrisWidth * 2 + 1],
    [tetrisWidth + 1, tetrisWidth + 2, tetrisWidth * 2, tetrisWidth * 2 + 1],
  ];

  const tTetrisBlock = [
    [1, tetrisWidth, tetrisWidth + 1, tetrisWidth + 2],
    [1, tetrisWidth + 1, tetrisWidth + 2, tetrisWidth * 2 + 1],
    [tetrisWidth, tetrisWidth + 1, tetrisWidth + 2, tetrisWidth * 2 + 1],
    [1, tetrisWidth, tetrisWidth + 1, tetrisWidth * 2 + 1],
  ];

  const oTetrisBlock = [
    [0, 1, tetrisWidth, tetrisWidth + 1],
    [0, 1, tetrisWidth, tetrisWidth + 1],
    [0, 1, tetrisWidth, tetrisWidth + 1],
    [0, 1, tetrisWidth, tetrisWidth + 1],
  ];

  const iTetrisBlock = [
    [1, tetrisWidth + 1, tetrisWidth * 2 + 1, tetrisWidth * 3 + 1],
    [tetrisWidth, tetrisWidth + 1, tetrisWidth + 2, tetrisWidth + 3],
    [1, tetrisWidth + 1, tetrisWidth * 2 + 1, tetrisWidth * 3 + 1],
    [tetrisWidth, tetrisWidth + 1, tetrisWidth + 2, tetrisWidth + 3],
  ];

  const tetrisBlocks = [
    lTetrisBlock,
    zTetrisBlock,
    tTetrisBlock,
    oTetrisBlock,
    iTetrisBlock,
  ];

  const tetrisColors = [
    "#FF0D72",
    "#0DC2FF",
    "#0DFF72",
    "#FF8E0D",
    "#FFE138",
    "#F538FF",
    "#3877FF",
    "#FF4B38",
  ];

  console.log(tetrisColors[0]);
  let currentPosition = Math.floor(Math.random() * tetrisWidth);
  let currentRotation = Math.floor(Math.random() * 4);
  let random = Math.floor(Math.random() * tetrisBlocks.length);
  let currentColor = tetrisColors[Math.floor(Math.random() * 8)];
  current = tetrisBlocks[random][currentRotation];

  //drawing tetris blocks
  function draw() {
    current.forEach((index) => {
      tetrisSquares[currentPosition + index].style.backgroundColor =
        currentColor;
      tetrisSquares[currentPosition + index].style.border = "1px solid black";
    });
  }

  function unDraw() {
    current.forEach((index) => {
      tetrisSquares[currentPosition + index].style.backgroundColor = "";
      tetrisSquares[currentPosition + index].style.border = "";
    });
  }

  // move tetris blocks
  function controlpad(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener("keydown", controlpad);

  //move tetris block down grid
  // timerId = setInterval(moveDown, 1000);

  function moveDown() {
    if (isgameOver) {
      return;
    }
    unDraw();
    currentPosition += tetrisWidth;
    draw();
    freeze();
  }
  // moveDown();

  // to keep the new block within the grid, you'll need to get the width of the present block
  function getBlockWidth(block) {
    let xCoordinates = block.map((index) => index % tetrisWidth);
    return Math.max(...xCoordinates) - Math.min(...xCoordinates) + 1;
  }

  // add freeze function to keep the block there
  function freeze() {
    if (
      current.some((index) =>
        tetrisSquares[currentPosition + index + tetrisWidth].classList.contains(
          "taken"
        )
      )
    ) {
      current.forEach((index) =>
        tetrisSquares[currentPosition + index].classList.add("taken")
      );
      //start a new tetris block falling
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * tetrisBlocks.length);
      current = tetrisBlocks[random][currentRotation];
      let blockWidth = getBlockWidth(current);
      currentPosition = Math.floor(Math.random() * (tetrisWidth - blockWidth));
      draw();
      displayShape();
      removeRow();
      gameOver();
    }
  }

  // move the tetris block left, unless is at the edge or hits a block
  function moveLeft() {
    unDraw();

    // checks to see if block is at the edge, if not, then move left;
    const isLeftEdge = current.some(
      (index) => (currentPosition + index) % 10 === 0
    );
    if (!isLeftEdge) currentPosition -= 1;

    //if there is a tetris block to the left of the current position
    if (
      current.some((index) =>
        tetrisSquares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }

    // draw again with the new position
    draw();
  }

  // move tetris block right, unless it is at the edge or hits a block
  function moveRight() {
    unDraw();
    // checks to see if block is at the edge, if not, then move right
    const isAtRightEdge = current.some(
      (index) => (currentPosition + index) % tetrisWidth === tetrisWidth - 1
    );
    if (!isAtRightEdge) currentPosition += 1;

    // if there is a tetris block to the right of the current position
    if (
      current.some((index) =>
        tetrisSquares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition -= 1;
    }
    draw();
  }

  function rotate() {
    unDraw();
    // rotate it
    currentRotation++;

    // here are some reservations: if the rotation is equal to the length of the array, then go back to 0
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    // if the current block is going to hit a taken block, then go back
    if (
      current.some((index) =>
        tetrisSquares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentRotation > 0 ? (currentRotation -= 1) : (currentRotation = 3);
    }
    // if the current block is going to hit the right edge, then go back
    const isAtRightEdge = current.some(
      (index) => (currentPosition + index) % tetrisWidth === tetrisWidth - 1
    );
    if (!isAtRightEdge) {
      currentRotation > 0 ? (currentRotation -= 1) : (currentRotation = 3);
    }
    // if the current block is going to hit the left edge, then go back
    const isLeftEdge = current.some(
      (index) => (currentPosition + index) % 10 === 0
    );
    if (!isLeftEdge) {
      currentRotation > 0 ? (currentRotation -= 1) : (currentRotation = 3);
    }

    current = tetrisBlocks[random][currentRotation];
    draw();
  }

  // show up-next block in mini-grid display
  const displayTetrisSquares = document.querySelectorAll(".nextBlockGrid div");
  const displayWidth = 4;
  let displayIndex = 4;

  // tetris blocks without rotations
  const upNextTetrisBlocks = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], // lblock
    [
      displayWidth + 1,
      displayWidth * 2 + 1,
      displayWidth * 2 + 2,
      displayWidth * 3 + 2,
    ], // zblock
    [
      displayWidth * 2 + 1,
      displayWidth + 1,
      displayWidth * 3 + 1,
      displayWidth * 2 + 2,
    ], // tblock
    [
      displayWidth + 1,
      displayWidth + 2,
      displayWidth * 2 + 1,
      displayWidth * 2 + 2,
    ], // oblock
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], // iblock
  ];

  // display the shape in the mini-grid display
  function displayShape() {
    // remove any trace of a tetris block from the entire grid
    console.log("color Selected");
    currentColor = tetrisColors[Math.floor(Math.random() * 8)];
    displayTetrisSquares.forEach((block) => {
      block.style.backgroundColor = "";
    });
    upNextTetrisBlocks[nextRandom].forEach((index) => {
      displayTetrisSquares[index].style.backgroundColor = currentColor;
    });
  }
  function startGame() {
    if (isgameOver) {
      return;
    }
    draw();
    displayShape();
    timerId = setInterval(moveDown, 1000);
    gameStatus = "playing";
  }

  function pauseGame() {
    clearInterval(timerId);
    gameStatus = "paused";
  }
  // start button
  startBtn.addEventListener("click", () => {
    playerName = playerNameInput.value.trim();

    if (playerName === "" && gameStatus === "pre game") {
      alert("Please enter your name");
      console.log("status", gameStatus);
      return;
    }
    playerNameInput.value = "";

    gameStatusContainer.style.display = "none";

    switch (gameStatus) {
      case "pre game":
        startGame();
        break;
      case "playing":
        pauseGame();
        break;
      case "paused":
        startGame();
        break;
    }
  });

  //remove rows once they are filled
  function removeRow() {
    for (let i = 0; i < 199; i += tetrisWidth) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];

      if (
        row.every((index) => tetrisSquares[index].classList.contains("taken"))
      ) {
        score += parseInt(10);
        scoreDisplay.innerHTML = `${score}`;
        row.forEach((index) => {
          tetrisSquares[index].classList.remove("taken");
          tetrisSquares[index].classList.remove(currentColor);
        });
        const squaresRemoved = tetrisSquares.splice(i, tetrisWidth);
        tetrisSquares = squaresRemoved.concat(tetrisSquares);
        tetrisSquares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }

  //game over function
  function gameOver() {
    if (
      current.some((index) =>
        tetrisSquares[currentPosition + index].classList.contains("taken")
      )
    ) {
      isgameOver = true;
      scoreDisplay.innerHTML = "end";
      clearInterval(timerId);
      let i = 0;
      let intervalId = setInterval(() => {
        if (i < tetrisSquares.length - 10) {
          tetrisSquares[i].style.backgroundColor = "";
          tetrisSquares[i].style.border = "";
          tetrisSquares[i].style.backgroundColor = `${tetrisColors[i % 8]}`;
          i++;
        } else {
          clearInterval(intervalId);
          let j = tetrisSquares.length - 1;
          let intervalId2 = setInterval(() => {
            if (j >= 0) {
              tetrisSquares[j].style.backgroundColor = ``;
              tetrisSquares[j].classList.remove("taken");
              j--;
            } else {
              clearInterval(intervalId2); // Fix here: clear the correct interval
              tetrisSquares.slice(-10).forEach((square) => {
                square.classList.add("taken");
              });
              currentPosition = 4;
              currentRotation = 0;
              random = Math.floor(Math.random() * tetrisBlocks.length);
              current = tetrisBlocks[random][currentRotation];
              isgameOver = false; // Reset game state
              // timerId = setInterval(moveDown, 1000);
              const playerScore = { name: playerName, score: score };
              highScores.push(playerScore);
              highScores.sort((a, b) => b.score - a.score);
              displayHighScore();
              score = 0;
              scoreDisplay.innerHTML = `${score}`;
              gameStatus = "pre game";
              timerId = null;
            }
          }, 1);
        }
      }, 1);
    }
  }

  function displayHighScore() {
    highScore.innerHTML = "";
    highScores.forEach((score, index) => {
      const scoreElement = document.createElement("li");
      scoreElement.innerHTML = `${index + 1}. ${score.name} - ${score.score}`;
      highScore.appendChild(scoreElement);
    });
  }
});
