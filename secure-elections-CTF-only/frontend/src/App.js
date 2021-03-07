import { Route, HashRouter } from "react-router-dom";

import "./App.css";
import Navbar from "./components/navbar";
import Admin from "./components/admin";
import Home from "./components/home";
import Register from "./components/register";
import Vote from "./components/vote";
import Results from "./components/results";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
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
