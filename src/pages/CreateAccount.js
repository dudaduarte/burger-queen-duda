import React from "react";
import "./CreateAccount.css";
import firebase from "../firebaseConfig";
import withFirebaseAuth from "react-with-firebase-auth";
import Button from "../components/Button";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();

class createAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPass: "",
      accType: "",
    };
  }

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value;
    this.setState(newState);
  };

  createUser = () => {
    if (this.state.password === this.state.confirmPass) {
      this.props
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(resp => {
          database
            .collection("users")
            .doc(resp.user.uid)
            .set({
              email: this.state.email,
              displayName: this.state.displayName,
              accType: this.state.accType,
            });
        })
        .then(() => this.props.history.push(`/${this.state.accType}`))
        .catch(() => alert("Ocorreu um erro. Tente novamente."));
    } else {
      alert(
        "As senhas digitadas não conferem entre si. Insira novamente sua senha e confirme."
      );
    }
  };

  render() {
    return (
      <section className="create-user-container">
        <form>
          <div className="form-group">
            <label for="user-name">Nome</label>
            <input
              type="text"
              className="form-control"
              id="user-name"
              value={this.state.displayName}
              onChange={event => this.handleChange(event, "displayName")}
              placeholder="Seu nome completo"
            />
          </div>
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
          <div className="form-group">
            <label for="confirm-password">Confirmar senha</label>
            <input
              type="password"
              className="form-control"
              id="confirm-password"
              value={this.state.confirmPass}
              onChange={event => this.handleChange(event, "confirmPass")}
              placeholder="Digite novamente sua senha"
            />
          </div>
          <label>Selecione o seu local de trabalho:</label>
          <tr className="form-group form-check" onChange={event => this.handleChange(event, "accType")}>
              <td>
                <input
                  type="radio"
                  className="form-check-input"
                  name="acc-type"
                  value="kitchen"
                  id="check-kitchen"
                />
              </td>
              <label className="form-check-label" for="check-kitchen">
                Cozinha
              </label>
              <td>
                <input
                  type="radio"
                  className="form-check-input"
                  name="acc-type"
                  value="saloon"
                  id="check-saloon"
                />
              </td>
              <label className="form-check-label" for="check-saloon">
                Salão
              </label>
          </tr>
        </form>
        <Button
          className="btn btn-success btn-first-page"
          text="Cadastrar"
          onClick={this.createUser}
        />
      </section>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(createAccount);
