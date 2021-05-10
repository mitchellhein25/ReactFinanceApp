import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/accounts" exact component={() => <Accounts />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
