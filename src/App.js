import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Import components
import Main from "./components/Main";
import AboutPage from "./components/AboutPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about" component={AboutPage}></Route>
        <Route path="/" exact component={Main}></Route>
      </Switch>
    </Router>
  );
}

export default App;
