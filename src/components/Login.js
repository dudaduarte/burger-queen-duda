import React from "react";
import "./Login.css";
import Button from "./Button";
import firebase from "./firebaseConfig";
import withFirebaseAuth from 'react-with-firebase-auth';
// import getOrders from './pages/getOrders'

const firebaseAppAuth = firebase.auth();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value;
    this.setState(newState);
  };

  createUser = () => {
    this.props.createUserWithEmailAndPassword(this.state.email, this.state.password);
  }

  signIn = () => {
    this.props.signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      alert('logado');
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {

    console.log(this.props.user);

    return (
      <section>
        <div>
          <input
            type="text"
            id="email"
            placeholder="e-mail"
            value={this.state.email}
            onChange={event => this.handleChange(event, "email")}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="senha"
            value={this.state.password}
            onChange={event => this.handleChange(event, "password")}
          />
        </div>
        {/* <Button text="clique aqui" /> */}
        <button id="create-user-btn" type="submit" onClick={this.createUser}>
          Criar Usuário
        </button>
        <button id="login-btn" type="submit" onClick={this.signIn}>
          Login
        </button>
      </section>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Login);