import Player from './components/Player.jsx';
import TimerChallenge from './components/TimerChallenge.jsx';

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallenge title="Chelonoidis niger" targetTime={1}/>
        <TimerChallenge title="Oryctolagus cuniculus" targetTime={5}/>
        <TimerChallenge title="Acinonyx jubatus" targetTime={10}/>
        <TimerChallenge title="Falco peregrinus" targetTime={15}/>
      </div>
    </>
  );
}

export default App;
