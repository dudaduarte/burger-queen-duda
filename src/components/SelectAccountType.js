import React from "react";
import "./SelectAccountType.css";
import Button from "./Button";

export default class BtnAccType extends React.Component {
  handlePageChange = location => {
    window.location = location;
  }

  render() {
    return (
      <section className="bla">
        <Button text="Cozinha" onClick={() => this.handlePageChange("/login-saloon")} />
        <Button text="Salão" onClick={() => this.handlePageChange("/login-saloon")} />
        <div>
          <Button text="Criar Conta" onClick={() => this.handlePageChange("/create-account")} />
        </div>
      </section>
    );
  }
}
