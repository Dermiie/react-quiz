import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';

const initialState = {
  questions: [],

  //Loading, ready, error, active, finished
  status: 'loading',
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
    default:
      throw new Error('Unknown action');
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status } = state;

  const numOfQuestions = questions.length;

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
        {status === 'active' && <Question></Question>}
      </Main>
    </div>
  );
}

export default App;
