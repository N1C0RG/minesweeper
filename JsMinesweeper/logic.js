document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid-p');
  let width = 10; 
  let lenght = 10; 
  let squares = [];
  let bombAmount = 20; 
  let isGameOver = false;
  let flags = 0;

  function createBoard() { 
    const bombArray = Array(bombAmount).fill('bomb');
    const emptyArray = Array(width * lenght - bombAmount).fill('valid');
    console.log(bombArray, emptyArray);

    const gameArray = emptyArray.concat(bombArray);
    console.log(gameArray);

    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);
    console.log(shuffledArray);

    for (let i = 0; i < width * lenght; i++) {
      const square = document.createElement('div');
      square.setAttribute('id', i);
      square.classList.add(shuffledArray[i]);
      grid.appendChild(square);
      squares.push(square);

      //noramal click 
      square.addEventListener('click', function(e) {
        click(square);
      });

      //cntrl and left click
      square.oncontextmenu = function(e) {
        e.preventDefault();
        addFlag(square);
      }
    }

    // ver bombas cercanas 

    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      const isLeftEdge = (i % width === 0);
      const isRightEdge = (i % width === width - 1);

      if (squares[i].classList.contains('valid')) {
        if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total ++; 
        if (i > width - 1 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total ++;
        if (i > width && squares[i - width].classList.contains('bomb')) total ++;
        if (i > width + 1 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) total ++;
        if (i < width * lenght - 2 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total ++;
        if (i < width * lenght - width && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total ++;
        if (i < width * lenght - width - 2 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total ++;
        if (i < width * lenght - width - 1 && squares[i + width].classList.contains('bomb')) total ++;

        squares[i].setAttribute('data', total);
    
    }}
  }
  createBoard();

  //add flag right click 

  function addFlag(square) {
    if (isGameOver) return;
    if (!square.classList.contains('checked') && (flags < bombAmount)) {
      if (!square.classList.contains('flag')) {
        square.classList.add('flag');
        square.innerHTML = ' 🚩';
        flags ++;
        checkForWin();
      } else { 
        square.classList.remove('flag');
        square.innerHTML = '';
        flags --;
      }
    }} 

  //click on square actions

  function click(square) { 
    console.log('el square: '+square);
    console.log('el index: '+ square.id);
    let currentId = square.id;
    if (isGameOver) return;
    if (square.classList.contains('checked') || square.classList.contains('flag')) return; 
    if (square.classList.contains('bomb')) {
      gameOver(square); 
    } else { 
      let total = square.getAttribute('data');
      if (total != 0) {
        square.classList.add('checked');
        square.innerHTML = total;
        return;
      }
      checkSquare(square, currentId); 
    }
    square.classList.add('checked');
  }

  // ver bombas cercanas a la casilla clickeada

  function checkSquare(square, currentId) {
    const isLeftEdge = (currentId % width === 0);
    const isRightEdge = (currentId % width === width - 1);

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > width - 1 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > width) {
        const newId = squares[parseInt(currentId - width)].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId > width + 1 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < width * lenght - 2 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < width * lenght - width && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < width * lenght - width - 2 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      if (currentId < width * lenght - width - 1) {
        const newId = squares[parseInt(currentId) + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
    }, 10);

  }

  //game over 

  function gameOver(square) { 
    console.log('BOOM! Game Over!');
    isGameOver = true;
    
    squares.forEach(square => {
      if (square.classList.contains('bomb')) {
        square.innerHTML = '💣'; 
      }
    });
  }

  //check for win 

  function checkForWin() { 
    let matches = 0; 
    for (let i =0; i < squares.length; i++) {
      if (squares[i].classList.contains('bomb') && squares[i].classList.contains('flag')) {
        matches ++; 
      }
      if (flags === bombAmount) {
        console.log('YOU WIN!');
        isGameOver = true;
      } 
    }
  }





}); 