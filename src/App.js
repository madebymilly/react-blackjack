import './styling/App.css';
import Board from './components/Board'
import { RoundProvider } from './context/RoundContext'

function App() {
  return (
    <div className="App">
      <RoundProvider>
        <Board />
      </RoundProvider>
    </div>
  );
}

export default App;
