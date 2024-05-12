import './App.css';
import Effect from './Effect';
import State from './State';

function App() {


  return (
    <div className="App">

      <div className="black-bg">
        <h3>멋쟁이사자처럼</h3>
      </div>
      <h1>useState Example</h1>
      <State />
      <h1>useEffect Example</h1>
      <Effect />
    </div>
  );
}

export default App;
