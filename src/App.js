import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Import context
import { CoordinateProvider } from "./context/CoordinateContext";
import { SRSProvider } from "./context/SRSContext";
import { RefProvider } from "./context/RefContext";

//Import components
import Main from "./components/Main";
import AboutPage from "./components/AboutPage";

function App() {
  return (
    <CoordinateProvider>
      <SRSProvider>
        <RefProvider>
          <Router>
            <Switch>
              <Route path="/about" component={AboutPage}></Route>
              <Route path="/" exact component={Main}></Route>
            </Switch>
          </Router>
        </RefProvider>
      </SRSProvider>
    </CoordinateProvider>
  );
}

export default App;
