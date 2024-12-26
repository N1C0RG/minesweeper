import Navbar from "../../Commponents/Navbar/navbar";
import { useState, useEffect, useContext } from "react";
import Smile from "../../assets/game/smile-icon.png";
import Sad from "../../assets/game/sad-icon.png";
import React from "react";
import cn from "classnames";
import "./game.css";
import ConfigMenu from "../../Commponents/GameConfig/gameConfig";
import ExplosionSound from "../../assets/lose_minesweeper.wav";
import { useStopwatch } from 'react-timer-hook';
import WinMessageComponent from "../../Commponents/GameMessage/winMessage";
import LoseMessageComponent from "../../Commponents/GameMessage/loseMessage";
import { AppContext } from "../../context/appContext";
import axios from "axios";
import { useSocket  } from "../../context/socketContext";

const URL = process.env.REACT_APP__BACKEND_URL; // URL del backend

function Game() {
  const [shuffledArray, setShuffledArray] = useState([]);
  const [width, setWidth] = useState(16);
  const [length, setLength] = useState(16);
  const [bombAmount, setBombAmount] = useState(40);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [flags, setFalgs] = useState(0); 
  const [firstClick, setFirstClick] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  // de la matriz que voy a hacer 

  const [matrixC, setMatrixC] = useState([]);
  const [tilesC, setTilesC] = useState([]);
  const [replay, setReplay] = useState(false);
  let matrix; 

  //el timer 
  const {
    totalSeconds,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

  //lo mensajes 
  const [winMessage, setWinMessage] = useState(false);
  const [loseMessage, setLoseMessage] = useState(false);

  // data del usuario 
  const { getId, setScore, getScore } = useContext(AppContext);

  function closeMessage() {
    setWinMessage(false);
    setLoseMessage(false);
  } 

  // defino componentes css 

  function selectDifficulty(difficulty) {
    setDifficulty(difficulty);
    switch (difficulty) {
      case 'easy':
        setWidth(8);
        setLength(8);
        setBombAmount(10);
        break; 
      case 'medium':
        setWidth(16);
        setLength(16);
        setBombAmount(40);
        break;
      case 'hard':
        setWidth(32);
        setLength(16);
        setBombAmount(99);

        break;
      default:
        setWidth(16);
        setLength(16);
        setBombAmount(40);
        break;
    }   
  } 

  function createArray() {
    const bombArray = Array(bombAmount).fill('bomb');
    const emptyArray = Array(width * length - bombAmount).fill('valid');
    const gameArray = emptyArray.concat(bombArray);
    setShuffledArray(gameArray.sort(() => Math.random() - 0.5));
  }

  //genero la matrix 
  function generateMatrix() {
    const newMatrix = [];
    for (let i = 0; i < length * width; i++) {
      newMatrix[i] = [[shuffledArray[i]], 0, false, 'null'];       
    } 
    matrix = newMatrix;
  } 

  function matrixMines(matrix) { 
    let newMatrix = matrix;
    for (let i = 0; i < matrix.length; i++) {
      let total = 0;
      const isLeftEdge = (i % width === 0);
      const isRightEdge = (i % width === width - 1);
      const value = matrix[i][0][0];
      if (value === 'valid') {
        // izquierda
        if (i > 0 && !isLeftEdge && matrix[i - 1][0][0] === 'bomb') total++;
        // top derecha
        if (i >= width - 1 && !isRightEdge && matrix[i + 1 - width][0][0] === 'bomb') total++;
        // top 
        if (i >= width && matrix[i - width][0][0] === 'bomb') total++;
        // top izquierda 
        if (i >= width + 1 && !isLeftEdge && matrix[i - 1 - width][0][0] === 'bomb') total++;
        // derecha 
        if (i < width * length - 1 && !isRightEdge && matrix[i + 1][0][0] === 'bomb') total++;
        // abajo izquierda
        if (i < width * length - width && !isLeftEdge && matrix[i - 1 + width][0][0] === 'bomb') total++;
        // abajo derecha 
        if (i < width * length - width - 1 && !isRightEdge && matrix[i + 1 + width][0][0] === 'bomb') total++;
        // abajo 
        if (i < width * length - width && matrix[i + width][0][0] === 'bomb') total++
        newMatrix[i][1] = total;
      }
    }
    matrix = newMatrix;
  }

  function generateTile(matrix) { 
    const newTiles = []; 
    for (let i = 0; i < width * length; i++) {
      let cname = matrix[i][0][0];
      if (matrix[i][0].length > 1){
        cname = matrix[i][0][1];
      } 
      const element = (
        <div 
          key={i} 
          className={cname} 
          onClick={() => click(i)}
          onContextMenu={(e) => {
            e.preventDefault();
            addFlag(i);
          }}
        >
          {matrix[i][2] === 'true' ? <p>{matrix[i][1]}</p> : null}
        </div> 
      )
      newTiles.push(element);
    }
    setTilesC(newTiles);
  }

  
  useEffect(() => {
    createArray();
  }, [width, length, bombAmount, replay]);


  useEffect(() => {
    if (shuffledArray.length > 0) {
      generateMatrix();
      matrixMines(matrix);
      setMatrixC(matrix);
      generateTile(matrix);
      if (isRunning){
        pause();
      }
    }
  }, [shuffledArray]);

  function addFlag(index) {
    let newMatrix = [...matrixC];    
    const newTile = newMatrix[index][0];
    if (isGameOver) return;
    if (isWin) return;
    if (!newTile.includes('checked')) {
      if (!newTile.includes('flag') && (flags < bombAmount)) {
        newMatrix[index][0].push('flag');
        newMatrix[index][3] = 'flag';
        setMatrixC(newMatrix);
        generateTile(newMatrix);
        setFalgs(flags + 1);
        checkForWin();
      } else {  
        if (newTile.includes('flag')) {
          newMatrix[index][0].pop('flag');
          newMatrix[index][3] = '';
          setFalgs(flags - 1);
        }
      }
      setMatrixC(newMatrix);
      generateTile(newMatrix);
    }
  } 

  function click(index) {  
    if (firstClick === false) {
      start();  
      setFirstClick(true)
    }; 
    let newMatrix = [...matrixC];    
    const newTile = newMatrix[index][0];
    if (isGameOver) return;
    if (isWin) return;
    if (newTile.includes('checked') || newTile.includes('flag')) return;
    if (newTile.includes('bomb')) {
      gameOver();
    } else {
      const total = newMatrix[index][1];
      if (total !== 0) {
        newMatrix[index][0][1] = 'checked';
        newMatrix[index][2] = 'true';
        setMatrixC(newMatrix);
        generateTile(newMatrix);
        return;
      } 
      newMatrix[index][0].push('checked');
      setMatrixC(newMatrix);
      checkSquare(index);
      generateTile(newMatrix);
    }
  }

  function checkSquare(currentId) {
    const isLeftEdge = (currentId % width === 0);
    const isRightEdge = (currentId % width === width - 1);

    setTimeout(() => {
      if (currentId > 0 && !isLeftEdge) {
        const newId = currentId - 1
        click(newId);
      }
      if (currentId > width - 1 && !isRightEdge) {
        const newId = currentId + 1 - width;
        click(newId);
      }
      if (currentId > width) {
        const newId = currentId - width;
        click(newId);
      }
      if (currentId > width + 1 && !isLeftEdge) {
        const newId = currentId - 1 - width;
        click(newId);
      }
      if (currentId < width * length - 2 && !isRightEdge) {
        const newId = currentId + 1;
        click(newId);
      }
      if (currentId < width * length - width && !isLeftEdge) {
        const newId = currentId - 1 + width;
        click(newId);
      }
      if (currentId < width * length - width - 2 && !isRightEdge) {
        const newId = currentId + 1 + width;
        click(newId);
      }
      if (currentId < width * length - width - 1) {
        const newId = currentId + width;
        click(newId);
      }
    }, 10);

  }

  function gameOver() { 
    pause(); 
    setIsGameOver(true);
    let newMatrix = [...matrixC];
    for (let i = 0; i < length * width; i++) {
      if (newMatrix[i][0].includes('bomb')) {
        newMatrix[i][0][1] = 'explode';
      }
    }
    setMatrixC(newMatrix);
    generateTile(newMatrix);
    const soundGap = [0, 200, 200, 400, 200, 200, 400, 200, 200, 100];
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        new Audio(ExplosionSound).play();
        if (i === 9) {
          setLoseMessage(true);
        }
      }, i * soundGap[i]); 
    }
  }

  function checkForWin() { 
    let newMatrix = [...matrixC];
    let matches = 0; 
    for (let i =0; i < length * width; i++) {
      if (newMatrix[i][0].includes('bomb') && newMatrix[i][0].includes('flag')) {
        matches ++; 
      }
      if (matches === bombAmount) {
        pause();
        //updateScore();
        setIsWin(true);
        setWinMessage(true);
      } 
    }
  }

  function replayGame() { 
    reset();
    setWinMessage(false);
    setLoseMessage(false);
    setFirstClick(false);
    setIsGameOver(false);
    setIsWin(false);
    setFalgs(0);
    setReplay(!replay);
  }

  function multiplier() {
    switch (difficulty) {
      case 'easy':
        return 10;
      case 'medium':
        return 1000;
      case 'hard':
        return 10000;
      default:
        return 1000;
    }
  } 

  const socket = useSocket();

  useEffect(() => { 
    if (isWin && !isGameOver) {
      updateScore();
    }
  } , [isWin]);

  function calculateScore() {
    return Math.floor(1000 / totalSeconds) * multiplier();
  }

  function updateScore() {
    const points = calculateScore();
    if (points > getScore()){ 
      setScore(points);
      axios.put(`${URL}/user/${getId()}`, {
        score: points
      }).then((response) => {
        console.log('Update score to:', points);
        socket.emit('update_leaderBoard', { message: 'update' });
      }).catch((error) => {
        console.error('Update score error: ', error);
      }); 
    }
  }


  return (
    <>
      <div className="relative min-h-screen">
        <Navbar />
        <div className="absolute inset-0 bgImage z-[-1] opacity-80 min-h-screen"></div>
        <div className="flex flex-col items-center justify-center">
          <ConfigMenu onClickFunction={selectDifficulty} />
          <section className={cn("flex justify-between bg-[#a8a9aa] h-20 items-center mt-4 border-4 border-gray-500 rounded", 
            {
              "w-full sm:w-[600px]": width === 16,
              "w-full sm:w-[560px]": width === 8,
              "w-full lg:w-[1000px]": width === 32
            }
          )}>
            <span className="ml-10">
            <p className="bg-gray-950 p-1 text-red-500 text-4xl w-16 text-left">{totalSeconds}</p>
            </span>
            {!isGameOver ? (
              <img className="w-12 h-12" src={Smile} alt="" />
            ) : (
              <img className="w-12 h-12" src={Sad} alt="" />
            )}
            <span className="mr-10">
              <p className="bg-gray-950 p-1 text-red-500 text-4xl w-16 text-left">{flags}</p>
            </span>
          </section>
          <div className={cn("", 
            {
              "msGrid-m": width === 16,
              "msGrid-s": width === 8,
              "msGrid-l": width === 32 
            }
          )}>
            {tilesC.map((tile, index) => (
              React.cloneElement(tile, { 
                onClick: () => click(index),
                onContextMenu: (e) => 
                  {
                    e.preventDefault();
                    addFlag(index);
                  }
              })
            ))}
          </div>
        </div>
        <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
          {winMessage ? <WinMessageComponent closeMessage={closeMessage} replay={replayGame}/> : null}
          {loseMessage ? <LoseMessageComponent closeMessage={closeMessage} replay={replayGame}/> : null}
        </section>
      </div>

    </>
  );
}

export default Game;