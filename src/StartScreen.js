function StartScreen({ numOfQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React quiz</h2>
      <h3>{numOfQuestions} questions to test youe React knowledge</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'quizBegin' })}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default StartScreen;
