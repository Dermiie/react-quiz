import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progess';

const initialState = {
  questions: [],

  //Loading, ready, error, active, finished
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    case 'quizBegin':
      return {
        ...state,
        status: 'active',
      };
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    default:
      throw new Error('Unknown action');
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points } = state;

  const numOfQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function () {
    console.log('initial request');
    fetch('http://localhost:9000/questions')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return dispatch({ type: 'dataReceived', payload: data });
      })
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="app">
      <Header></Header>
      <Main>
        {status === 'loading' && <Loader></Loader>}
        {status === 'error' && <Error></Error>}
        {status === 'ready' && (
          <StartScreen
            numOfQuestions={numOfQuestions}
            dispatch={dispatch}
          ></StartScreen>
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numOfQuestions={numOfQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            ></Progress>
            <Question
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            ></Question>
            <NextButton dispatch={dispatch} answer={answer}></NextButton>
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
