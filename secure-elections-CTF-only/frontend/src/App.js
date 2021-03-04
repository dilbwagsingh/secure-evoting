import { Route, NavLink, HashRouter } from "react-router-dom";

import "./App.css";
import Admin from "./components/admin";
import Home from "./components/home";
import Register from "./components/register";
import Vote from "./components/vote";
import Results from "./components/results";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <div>
          <ul className="header">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register with CTF</NavLink>
            </li>
            <li>
              <NavLink to="/vote">Cast Vote</NavLink>
            </li>
            <li>
              <NavLink to="/results">Results</NavLink>
            </li>
            <li>
              <NavLink to="/admin">Admin Panel</NavLink>
            </li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/vote" component={Vote} />
            <Route exact path="/results" component={Results} />
            <Route exact path="/admin" component={Admin} />
          </div>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
