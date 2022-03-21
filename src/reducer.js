const reducer = (state, action) => {
  if (action.type === 'DECREMENT_SCORE') {
    return {
      ...state,
      score: state.score - 1,
    };
  }
  if (action.type === 'CORRECT_ANSWER') {
    return {
      ...state,
      isCorrect: true,
      message: { msg: 'Correct number !!', color: '#eee' },
    };
  }
  if (action.type === 'RANDOM_NUMBER') {
    return {
      ...state,
      randomNumber: Math.floor(Math.random() * 20) + 1,
    };
  }
  if (action.type === 'TO_HIGH') {
    return {
      ...state,
      message: { msg: 'To high !!', color: '#eee' },
    };
  }
  if (action.type === 'TO_LOW') {
    return {
      ...state,
      message: { msg: 'To low !!', color: '#eee' },
    };
  }
  if (action.type === 'GAME_OVER') {
    return {
      ...state,
      message: { msg: 'Game over !!', color: '#dc2626' },
    };
  }
  if (action.type === 'WARNING_ALERT') {
    return {
      ...state,
      message: { msg: 'Please enter a valid number e.g. 5', color: '#facc15' },
    };
  }
  if (action.type === 'RESET') {
    return {
      ...state,
      message: { msg: 'Start guessing...', color: '#eee' },
      score: 20,
      isCorrect: false,
      userGuess: '',
      randomNumber: Math.floor(Math.random() * 20) + 1,
    };
  }
  if (action.type === 'USER_GUESS') {
    return {
      ...state,
      userGuess: action.payload,
    };
  }
  if (action.type === 'UPDATE_LS') {
    return {
      ...state,
      highScore: action.payload,
    };
  }
  return state;
};

export default reducer;
