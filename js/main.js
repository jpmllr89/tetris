document.addEventListener('DOMContentLoaded', () =>{
  const tetrisRow = 200;
  for(let i = 0; i < tetrisRow; i++){
    const tetrisBlock = document.createElement('div');
    document.querySelector('.grid').appendChild(tetrisBlock);
  }


})