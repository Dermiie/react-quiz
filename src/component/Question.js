import Option from './Option';

function Question({ questions, answer, dispatch }) {
  console.log(questions);
  return (
    <div>
      <h3>{questions.question}</h3>
      <Option
        questions={questions}
        answer={answer}
        dispatch={dispatch}
      ></Option>
    </div>
  );
}

export default Question;
