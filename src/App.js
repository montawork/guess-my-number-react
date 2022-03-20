import React, { useState, useEffect } from 'react';

function App() {
  const [score, setScore] = useState(20);
  const [message, setMessage] = useState({
    msg: 'Start guessing...',
    color: '#eee',
  });
  const [userGuess, setUserGuess] = useState('');
  const [highScore, setHighScore] = useState(
    localStorage.getItem('bestScore') || 0
  );
  const [isCorrect, setIsCorrect] = useState(false);
  const [randomNumber, setRandomNumber] = useState(undefined);

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 20) + 1);
  }, []);

  const checkNumber = (e) => {
    if (userGuess) {
      setScore(score - 1);
      if (score > 1) {
        if (randomNumber === Number(userGuess)) {
          setMessage({ msg: 'Correct number !!', color: '#eee' });
          setIsCorrect(true);
          document.body.style.background = '#60b347';
          if (score > Number(highScore)) {
            localStorage.setItem('bestScore', score);
            setHighScore(score);
          }
        } else {
          Number(userGuess) > randomNumber
            ? setMessage({ msg: 'To high !!', color: '#eee' })
            : setMessage({ msg: 'To low !!', color: '#eee' });
        }
      } else {
        setMessage({ msg: 'Game over !!', color: '#dc2626' });
      }
    } else {
      setMessage({ msg: 'Please enter a valid number', color: '#facc15' });
    }
  };

  // reset
  const resetGame = () => {
    setMessage({
      msg: 'Start guessing...',
      color: '#eee',
    });
    setUserGuess('');
    setScore(20);
    setIsCorrect(false);
    document.body.style.background = '#222';
    setRandomNumber(Math.floor(Math.random() * 20) + 1);
  };

  return (
    <>
      <header>
        <h1>Guess My Number</h1>
        <p className="between">(Between 1 and 20)</p>
        <button className="btn again" onClick={resetGame}>
          Again!
        </button>
        <div className="number">{isCorrect ? userGuess : '?'}</div>
      </header>
      <main>
        <section className="left">
          <input
            type="number"
            className="guess"
            min="1"
            max="20"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
          />
          <button
            className="btn check"
            onClick={checkNumber}
            disabled={score < 1 || isCorrect ? true : false}
          >
            Check!
          </button>
        </section>
        <section className="right">
          <p className="message" style={{ color: message.color }}>
            {message.msg}
          </p>
          <p className="label-score">
            Score: <span className="score">{score}</span>
          </p>
          <p className="label-highscore">
            Highscore: <span className="highscore">{highScore}</span>
          </p>
        </section>
      </main>
    </>
  );
}

export default App;
