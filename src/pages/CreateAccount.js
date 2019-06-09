import React from "react";
import firebase from "../components/firebaseConfig";
import withFirebaseAuth from "react-with-firebase-auth";
import Button from "../components/Button";
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

const firebaseAppAuth = firebase.auth();

class createAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmpass: ""
    };
  }

  handlePageChange = () => {
    window.location = '/get-orders'
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value;
    this.setState(newState);
  };

  createUser = () => {
    this.props.createUserWithEmailAndPassword(
      this.state.email,
      this.state.password
    )
    .then(this.handlePageChange)
    .catch((error) => alert(error));
  };

  render() {
    console.log(this.props.user)

    return (
      <section>
        <div>
          <input
            type="text"
            id="name"
            placeholder="Nome"
            value={this.state.displayName}
            onChange={event => this.handleChange(event, "displayName")}
          />
        </div>
        <div>
          <input
            type="text"
            id="email"
            placeholder="E-mail"
            value={this.state.email}
            onChange={event => this.handleChange(event, "email")}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Senha"
            value={this.state.password}
            onChange={event => this.handleChange(event, "password")}
          />
        </div>
        <div>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirmar senha"
            value={this.state.confirmpass}
            onChange={event => this.handleChange(event, "confirmpass")}
          />
        </div>
        <Button text="Cadastrar" onClick={this.createUser} />
      </section>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(createAccount);
