import './styling/App.css';
import Board from './components/Board'
import { RoundProvider } from './context/RoundContext'
import { PlayerProvider } from './context/PlayerContext'


function App() {
  return (
    <div className="App">
      <RoundProvider>
        <PlayerProvider>
          <Board />
        </PlayerProvider>
      </RoundProvider>
    </div>
  );
}

export default App;
