import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <ul className="header">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/register">Register with CTF</a>
          </li>
          <li>
            <a href="/vote">Cast Vote</a>
          </li>
          <li>
            <a href="/results">Results</a>
          </li>
          <li>
            <a href="/admin">Admin Panel</a>
          </li>
        </ul>
        <div className="content"></div>
      </div>
    </div>
  );
}

export default App;
