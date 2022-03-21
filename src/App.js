import React, { useEffect, useReducer } from 'react';
import reducer from './reducer';

const initialState = {
  score: 20,
  message: {
    msg: 'Start guessing...',
    color: '#eee',
  },
  isCorrect: false,
  userGuess: '',
  randomNumber: undefined,
  highScore: localStorage.getItem('bestScore') || 0,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { score, message, isCorrect, userGuess, randomNumber, highScore } =
    state;

  // get random number
  useEffect(() => {
    dispatch({ type: 'RANDOM_NUMBER' });
  }, []);

  // update localStorage
  const updateLS = (newHighScore) => {
    dispatch({ type: 'UPDATE_LS', payload: newHighScore });
  };

  // check the answer
  const checkNumber = () => {
    if (userGuess) {
      dispatch({ type: 'DECREMENT_SCORE' });
      if (score > 1) {
        if (randomNumber === Number(userGuess)) {
          dispatch({ type: 'CORRECT_ANSWER' });
          document.body.style.background = '#60b347';
          if (score > Number(highScore)) {
            localStorage.setItem('bestScore', score);
            updateLS(score);
          }
        } else {
          Number(userGuess) > randomNumber
            ? dispatch({ type: 'TO_HIGH' })
            : dispatch({ type: 'TO_LOW' });
        }
      } else {
        dispatch({ type: 'GAME_OVER' });
      }
    } else {
      dispatch({ type: 'WARNING_ALERT' });
    }
  };

  // reset
  const resetGame = () => {
    dispatch({ type: 'RESET' });
    document.body.style.background = '#222';
  };

  // get input value
  const getUserGuess = (e) => {
    dispatch({ type: 'USER_GUESS', payload: e.target.value });
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
            onChange={getUserGuess}
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
