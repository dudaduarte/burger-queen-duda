import React from "react";
import "./Login.css";
import Button from "./Button";
import firebase from "./firebaseConfig";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      listItem: []
    };
  }

  handleClick = () => {
    this.setState({
      listItem: this.state.listItem.concat({
          email: this.state.email,
          password: this.state.password
      })
    });
  };

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value;
    this.setState(newState);
  };

  render() {
    return (
      <section>
        <div>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="e-mail"
            value={this.state.email}
            onChange={event => this.handleChange(event, "email")}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={this.state.password}
            onChange={event => this.handleChange(event, "password")}
          />
        </div>
        {/* <Button text="clique aqui" /> */}
        <button id="submit" type="submit" onClick={this.handleClick}>
          Enviar
        </button>
        {this.state.listItem.map(item => {
          return (
            <p>
              {item.email} | {item.password}
            </p>
          );
        })}
      </section>
    );
  }
}
