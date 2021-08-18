import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import Allocation from "./pages/Allocation";
import Auth from "./pages/Auth";
import Trends from "./pages/Trends";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/accounts" exact component={Accounts} />
          <Route path="/allocation" exact component={Allocation} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/trends" exact component={Trends} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
