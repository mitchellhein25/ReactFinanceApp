import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import Allocation from "./pages/Allocation";
import Auth from "./pages/Auth";
import Trends from "./pages/Trends";
import NavBar from "./components/NavBar/NavBar";

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    }
  }
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </div>
  );
}

export default App;
