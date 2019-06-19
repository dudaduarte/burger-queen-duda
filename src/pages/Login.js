import React from "react";
import "./Login.css";
import Button from "../components/Button";
import firebase from "../firebaseConfig";
import withFirebaseAuth from "react-with-firebase-auth";
// import Saloon from './pages/Saloon'

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value;
    this.setState(newState);
  };

  signIn = event => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(resp => {
        database
          .collection("users")
          .doc(resp.user.uid)
          .get()
          .then(doc => this.props.history.push(`/${doc.data().accType}`));
      })
      .catch(error => {
        alert(
          "Suas informações de login estão incorretas. Tente novamente ou crie uma conta."
        );
      });
  };

  render() {
    return (
      <section className="login-container">
        <form>
          <div className="form-group">
            <label for="email">E-mail</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={this.state.email}
              onChange={event => this.handleChange(event, "email")}
              placeholder="Digite seu email"
            />
          </div>
          <div className="form-group">
            <label for="password">Senha</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={this.state.password}
              onChange={event => this.handleChange(event, "password")}
              placeholder="Digite sua senha"
            />
          </div>
        </form>
        <Button
          className="btn btn-success btn-first-page"
          text="Login"
          onClick={this.signIn}
        />
      </section>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(Login);
