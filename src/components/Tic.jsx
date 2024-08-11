import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Typewriter } from 'react-simple-typewriter';

const Tic = () => {
  const [squares, setSquares] = useState(Array(9).fill(''));
  const [player1, setPlayer1] = useState(true);
  const [showContent, setShowContent] = useState(false); // State to control content visibility

  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  useEffect(() => {
    // Show content after Typewriter effect completes
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000); // Adjusted delay for content visibility

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const handleClick = (index) => {
    if (squares[index] !== '') return;
    const newSquares = squares.slice();
    newSquares[index] = player1 ? 'X' : 'O';
    setSquares(newSquares);
    setPlayer1(!player1);
    checkWinner(newSquares);
  };

  const checkWinner = (squares) => {
    for (const combo of winCombinations) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        alert(`${squares[a]} is the winner!`);
        resetGame();
        return;
      }
    }

    if (squares.every(square => square !== '')) {
      alert('Game over. Restart the game to play again.');
      resetGame();
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(''));
    setPlayer1(true);
  };

  return (
    <main className="text-center py-10 bg-[#9cf6fb] min-h-screen flex flex-col items-center">
      <div
            data-aos="zoom-in-up"
            data-aos-duration="1500"
            data-aos-once="false"
            className="text-3xl text-[#394f8a] mb-8 font-medium lg:inline-block"
          >
            &nbsp;
            <Typewriter
              words={["TIC TAC TOE", "BY", "HARI CHARHAN",]}
              loop={false}
              typeSpeed={100}
              deleteSpeed={100}
              delaySpeed={1000}
            />
          </div>
      <div
        className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex justify-center mb-8">
          <div
            className="grid grid-cols-3 gap-4 w-60"
            data-aos="fade-up"
          >
            {squares.map((value, index) => (
              <button
                key={index}
                className="box bg-[#4a5fc1] text-white text-4xl font-bold w-20 h-20 flex items-center justify-center rounded-lg shadow-lg hover:bg-[#ffddcc] transition-colors duration-300"
                onClick={() => handleClick(index)}
                data-aos="flip-left"
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <button
          className={`
            mt-3 px-4 py-2 w-48
            text-xl font-semibold bg-[#ffddcc]
            bg-gradient-to-t from-[#ffddcc] via-[#ffddcc] to-[#ffddcc]
            border-b-4 border-[#ffddcc] text-[#4a5fc1] text-lg
            rounded-2xl
            hover:border-b-2 hover:translate-y-px
            shadow-[0px_10px_13px_-7px_#000000,5px_5px_15px_5px_rgba(0,_0,_0,_0)]
            hover:bg-[#ffddcc] hover:text-[#a350a3]
          `}
          onClick={resetGame}
          data-aos="fade-up"
        >
          <span className="font-bold">Reset</span>
        </button>
      </div>
    </main>
  );
};

export default Tic;
