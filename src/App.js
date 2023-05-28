import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import AddTutorial from "./components/AddTutorial";
import TutorialsList from "./components/TutorialsList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              אימון
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              דף ניהול
            </Link>
          </li>
        </div>
      </nav>
      <header className="header1">
      <div className="header-container">
            <h2>מסך התרעות ירי טילים (ארצי)</h2>
      </div>
      </header>
        <Switch>
          <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
          <Route exact path="/add" component={AddTutorial} />
        </Switch>
    </div>
  );
}

export default App;
