document.addEventListener('DOMContentLoaded', () =>{
  const tetrisRow = 200;
  const tetrisWidth = 10;
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button');
  
  // Making Grid
  for(let i = 0; i < tetrisRow; i++){
    const tetrisBlock = document.createElement('div')
    grid.appendChild(tetrisBlock);
  }

  // Here we will make the taken blocks
  for(let i = 0; i < 10; i++){
    const tetrisBlock = document.createElement('div')
    tetrisBlock.classList.add('taken')
    grid.appendChild(tetrisBlock);
  }

  let tetrisSquares = Array.from(document.querySelectorAll('.grid div'));
  console.log(tetrisSquares)

  // const newPosition = () =>{
  //   return Math.floor(Math.random() * (tetrisWidth - blockWidth));
  // }

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
  let currentRotation = 0;
  let random = Math.floor(Math.random() * tetrisBlocks.length);
  current = tetrisBlocks[random][currentRotation];


  //drawing tetris blocks
  function draw(){
    current.forEach(index =>{
      tetrisSquares[currentPosition + index].classList.add('tetrisBlock');
    })
  }

  function unDraw(){
    current.forEach(index =>{
      tetrisSquares[currentPosition + index].classList.remove('tetrisBlock');
    })
  }

  //move tetris block
  document.addEventListener('keydown', e =>{
    if(e.keyCode === 37){
      moveLeft();
    }else if(e.keyCode === 39){
      moveRight();
    }
  });

  //move tetris block down grid
  timerId = setInterval(moveDown, 100);

  function moveDown(){
    unDraw();
    currentPosition += tetrisWidth;
    draw();
    freeze();
  }
  moveDown();

  // add freeze function to keep the block there
  function freeze(){
    if(current.some(index => tetrisSquares[currentPosition + index + tetrisWidth].classList.contains('taken'))){
      current.forEach(index => tetrisSquares[currentPosition + index].classList.add('taken'));
    }
    //start a new tetris block falling
    random = Math.floor(Math.random() * tetrisBlocks.length);
    current = tetrisBlocks[random][currentRotation];
    currentPosition = 4;
    draw();
  }
});
