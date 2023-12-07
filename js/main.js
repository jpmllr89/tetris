document.addEventListener('DOMContentLoaded', () =>{
  const tetrisRow = 200;
  const tetrisWidth = 10;
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button');
  
  for(let i = 0; i < tetrisRow; i++){
    const tetrisBlock = document.createElement('div')
    grid.appendChild(tetrisBlock);
  }
  let tetrisSquares = Array.from(document.querySelectorAll('.grid div'));
  console.log(tetrisSquares)

  // Here we will make the tetris blocks
  const lTetrisBlock = [
    [1, tetrisWidth + 1, tetrisWidth * 2 + 1, 2],
    [tetrisWidth, tetrisWidth + 1, tetrisWidth + 2, tetrisWidth * 2 + 2],
    [1, tetrisWidth + 1, tetrisWidth * 2 + 1, tetrisWidth * 2],
    [tetrisWidth, tetrisWidth * 2, tetrisWidth * 2 + 1, tetrisWidth * 2 + 2]
  ]

  const zTetrisBlock = [
    [0, tetrisWidth, tetrisWidth + 1, tetrisWidth * 2 + 1],
    [tetrisWidth + 1, tetrisWidth + 2, tetrisWidth * 2, tetrisWidth * 2 + 1],
    [0, tetrisWidth, tetrisWidth + 1, tetrisWidth * 2 + 1],
    [tetrisWidth + 1, tetrisWidth + 2, tetrisWidth * 2, tetrisWidth * 2 + 1]
  ]

  const tTetrisBlock = [
    [1, tetrisWidth, tetrisWidth + 1, tetrisWidth + 2],
    [1, tetrisWidth + 1, tetrisWidth + 2, tetrisWidth * 2 + 1],
    [tetrisWidth, tetrisWidth + 1, tetrisWidth + 2, tetrisWidth * 2 + 1],
    [1, tetrisWidth, tetrisWidth + 1, tetrisWidth * 2 + 1]
  ]

  const oTetrisBlock = [
    [0, 1, tetrisWidth, tetrisWidth + 1],
    [0, 1, tetrisWidth, tetrisWidth + 1],
    [0, 1, tetrisWidth, tetrisWidth + 1],
    [0, 1, tetrisWidth, tetrisWidth + 1]
  ]

  const iTetrisBlock = [
    [1, tetrisWidth + 1, tetrisWidth * 2 + 1, tetrisWidth * 3 + 1],
    [tetrisWidth, tetrisWidth + 1, tetrisWidth + 2, tetrisWidth + 3],
    [1, tetrisWidth + 1, tetrisWidth * 2 + 1, tetrisWidth * 3 + 1],
    [tetrisWidth, tetrisWidth + 1, tetrisWidth + 2, tetrisWidth + 3]
  ]
  
  const tetrisBlocks = [lTetrisBlock, zTetrisBlock, tTetrisBlock, oTetrisBlock, iTetrisBlock]

  let currentPosition = 4;
  let current = tetrisBlocks[0][0];

  console.log(tetrisBlocks, currentPosition, current)

  //drawing tetris blocks
  const draw = () =>{
    current.forEach(index =>{
      tetrisSquares[currentPosition + index].classList.add('tetrisBlock');
    })
  }

  const 

  //move tetris block
  document.addEventListener('keydown', e =>{
    if(e.keyCode === 37){
      moveLeft();
    }else if(e.keyCode === 39){
      moveRight();
    }
  });

  //randomly select tetris block
  let random = Math.floor(Math.random() * tetrisBlocks.length);
  console.log(random)
  let currentRotation = 0;
  current = tetrisBlocks[random][currentRotation];


});