import "./App.css";
import Card from "./components/Card";

function App() {
  return (
    <div className="App">
      <h1 className="App-header">Select the method of casting vote:</h1>
      <div className="container">
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default App;
