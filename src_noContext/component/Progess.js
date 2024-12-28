function Progress({ index, numOfQuestions, points, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress
        value={index + Number(answer !== null)}
        max={numOfQuestions}
      ></progress>
      <p>
        Question{' '}
        <span>
          {index + 1}/{numOfQuestions}
        </span>
      </p>
      <p>
        <strong>{points}</strong>/ {maxPoints} points
      </p>
    </header>
  );
}

export default Progress;
