import "./SnakeGame.css";
import { useCallback, useEffect, useState, useRef, useMemo } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [[10, 10]];
const INITIAL_DIRECTION = [0, 1];

export default function SnakeGame() {
  const [foodCoordinates, setFoodCoordinates] = useState(() => generateFoodCoordinates(INITIAL_SNAKE));
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const directionRef = useRef(direction);
  directionRef.current = direction;

  const grid = useMemo(() => Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill("")), []);

  const isSnakeCoordinate = useCallback((rowNo, colNo) => {
    return snake.some(([row, col]) => row === rowNo && col === colNo);
  }, [snake]);

  const handleKeyPress = useCallback((e) => {
    switch (e.key) {
      case 'ArrowLeft':
        if (directionRef.current[1] !== 1) setDirection([0, -1]);
        break;
      case 'ArrowRight':
        if (directionRef.current[1] !== -1) setDirection([0, 1]);
        break;
      case 'ArrowDown':
        if (directionRef.current[0] !== -1) setDirection([1, 0]);
        break;
      case 'ArrowUp':
        if (directionRef.current[0] !== 1) setDirection([-1, 0]);
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSnake((oldSnake) => {
        const newSnake = [...oldSnake];
        const head = newSnake[0];
        const newHead = [head[0] + directionRef.current[0], head[1] + directionRef.current[1]];

        if (newHead[0] === foodCoordinates[0] && newHead[1] === foodCoordinates[1]) {
          setFoodCoordinates(generateFoodCoordinates());
        } else {
          newSnake.pop();
        }

        if (isSnakeCoordinate(newHead[0], newHead[1]) || newHead[0] < 0 || newHead[0] >= GRID_SIZE || newHead[1] < 0 || newHead[1] >= GRID_SIZE) {
          clearInterval(intervalId);
          alert("Game Over!");
          return INITIAL_SNAKE;
        }

        newSnake.unshift(newHead);
        return newSnake;
      });
    }, 100);
   
    return () => {
      clearInterval(intervalId);
    };
  }, [foodCoordinates, handleKeyPress, isSnakeCoordinate]);

  useEffect(()=>{
    window.addEventListener('keydown', handleKeyPress);
    return ()=>{
        window.removeEventListener('keydown', handleKeyPress);
    }
  },[handleKeyPress])

  return (
    <>
      <h1>Snake Game</h1>
      <div className="container">
        {grid.map((row, rowNo) => (
          row.map((cell, colNo) => (
            <div className={`cell ${isSnakeCoordinate(rowNo, colNo) ? 'snake' : foodCoordinates[0] === rowNo && foodCoordinates[1] === colNo ? 'food' : ''}`} key={`${rowNo}-${colNo}`}></div>
          ))
        ))}
      </div>
    </>
  );
}

function generateFoodCoordinates() {
    return [Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)];
  
}