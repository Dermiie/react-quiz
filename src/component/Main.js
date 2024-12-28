import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progess';
import FinishScreen from './FinishScreen';
import { useQuiz } from '../context/QuizContext';

function Main() {
  const { status } = useQuiz();
  return (
    <main className="main">
      {status === 'loading' && <Loader></Loader>}
      {status === 'error' && <Error></Error>}
      {status === 'ready' && <StartScreen></StartScreen>}
      {status === 'active' && (
        <>
          <Progress></Progress>
          <Question></Question>
          <NextButton></NextButton>
        </>
      )}

      {status === 'finished' && <FinishScreen></FinishScreen>}
    </main>
  );
}

export default Main;
