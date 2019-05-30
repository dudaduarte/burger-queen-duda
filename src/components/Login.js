import React from "react";
import "./Login.css";
import Button from "./Button";

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
    const object = {
      email: this.state.email,
      password: this.state.password
    };
    database.collection("burger-queen").add(object);
    this.setState({
      listItem: this.state.listItem.concat
    });
    this.setState({
      listItem: [
        {
          email: this.state.email,
          password: this.state.password
        }
      ]
    });
  };

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value;
    this.setState(newState);
  };

  handleEmail = event => {
    this.setState({ email: event.target.value });
  };

  handlePassword = event => {
    this.setState({ password: event.target.value });
  };

  // onChange = {(e) => this.handleChange(e, "email")}

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
            onChange={this.handleEmail}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handlePassword}
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
