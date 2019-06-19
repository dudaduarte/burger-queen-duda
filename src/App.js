import React from "react";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Saloon from "./pages/Saloon";
import CreateAccount from "./pages/CreateAccount";
import Kitchen from "./pages/Kitchen";
import firebase from "./firebaseConfig";
import withFirebaseAuth from "react-with-firebase-auth";
import { BrowserRouter as Router, Route } from "react-router-dom";

const firebaseAppAuth = firebase.auth();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            Burger Queen
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() =>
                    this.props.signOut().then(() => (window.location = "/"))
                  }
                >
                  Sair
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <Router>
          <Route 
            path="/" 
            exact component={Home} />
          <Route 
            path="/login" 
            component={Login} />
          <Route 
            path="/saloon" 
            component={Saloon} />
          <Route 
            path="/create-account" 
            component={CreateAccount} />
          <Route 
            path="/kitchen" 
            component={Kitchen} />
        </Router>
      </React.Fragment>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(App);
