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
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/vote">Vote</NavLink>
            </li>
            <li>
              <NavLink to="/results">Results</NavLink>
            </li>
            <li>
              <NavLink to="/admin">Admin</NavLink>
            </li>
          </ul>
        </div>
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/vote" component={Vote} />
          <Route path="/results" component={Results} />
          <Route path="/admin" component={Admin} />
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
