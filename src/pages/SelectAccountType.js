import React from "react";
import "./SelectAccountType.css";
import Button from "../components/Button";

export default class BtnAccType extends React.Component {
 
  handlePageChange = location => {
    window.location = location;
  }

  render() {
    return (
      <section className="btn-container">
        <Button className="btn btn-success btn-first-page" text="Login" onClick={() => this.handlePageChange("/login-saloon")} />
        <Button className="btn btn-primary btn-first-page" text="Criar Conta" onClick={() => this.handlePageChange("/create-account")} />
      </section>
    );
  }
}
