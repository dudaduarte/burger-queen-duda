import React from "react";
import "./Home.css";
import Button from "../components/Button";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accType: ""
    }
  }

  render() {
    return (

      <section className="btn-container">
        <Button
          className="btn btn-success btn-first-page"
          text="Login"
          onClick={() => this.props.history.push("/login")}
        />
        <Button
          className="btn btn-primary btn-first-page"
          text="Criar Conta"
          onClick={() => this.props.history.push("/create-account")}
        />
      </section>
    );
  }
}

export default Home;
