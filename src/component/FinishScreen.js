import { useQuiz } from '../context/QuizContext';

function FinishScreen() {
  const { points, maxPoints, highscore, dispatch } = useQuiz();

  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <div className="result">
        <p>
          You scored <strong>{points}</strong> out of {maxPoints} (
          {Math.ceil(percentage)}%)
        </p>
      </div>
      <p className="highscore">(Highscore: {highscore} points)</p>

      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: 'reset' });
        }}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
