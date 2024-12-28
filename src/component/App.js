import Header from './Header';
import Main from './Main';
import { QuizContextProvider } from '../context/QuizContext';

function App() {
  return (
    <QuizContextProvider>
      <div className="app">
        <Header></Header>
        <Main></Main>
      </div>
    </QuizContextProvider>
  );
}

export default App;
