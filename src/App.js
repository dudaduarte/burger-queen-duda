import React from "react";
import "./App.css";
// import BtnAccType from './components/SelectAccountType';
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import SelectAccountType from "./pages/SelectAccountType";
import getOrders from "./pages/getOrders";
import CreateAccount from "./pages/CreateAccount";
// import Button from './components/Button';
import Kitchen from "./pages/Kitchen";
import firebase from "./firebaseConfig";
import withFirebaseAuth from "react-with-firebase-auth";

const firebaseAppAuth = firebase.auth();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({ user });
        // localStorage.setItem('users', user.uid);
      } else {
        this.setState({ user: null });
        // localStorage.reoveItem('user');
      }
    });
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
        {/* {this.state.user ? <Redirect to="/get-orders" /> : <Redirect to="/" />} */}
        <Router>
          <Route path="/" exact component={SelectAccountType} />
          <Route path="/login-saloon" component={Login} />
          <Route path="/login-kitchen" component={Login} />
          <Route path="/get-orders" component={getOrders} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/kitchen" component={Kitchen} />
        </Router>
        {/* aí pra linkar pra outra pagina: */}
        {/* <Link to="banana"> oii </ Link> */}
      </React.Fragment>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(App);
