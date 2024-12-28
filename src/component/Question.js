import { useQuiz } from '../context/QuizContext';
import Option from './Option';

function Question() {
  const { questions, index } = useQuiz();

  const currQuestion = questions[index];

  return (
    <div>
      <h3>{currQuestion.question}</h3>
      <Option questions={currQuestion}></Option>
    </div>
  );
}

export default Question;
