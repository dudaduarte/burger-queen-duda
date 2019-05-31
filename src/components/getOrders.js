import React from "react";
import "./Login.css";
import Button from "./Button";
import firebase from "./firebaseConfig";

const database = firebase.firestore();

export default class getOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      food: "",
      beverage: "",
      clientName: "",
      listItem: []
    };
  }

  handleClick = () => {
    const object = {
      food: this.state.food,
      beverage: this.state.beverage,
      clientName: this.state.clientName
    };
    database.collection("saloon-orders").add(object)
    this.setState({
      listItem: this.state.listItem.concat(object)
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
            name="food"
            id="food"
            placeholder="Comidas"
            value={this.state.food}
            onChange={event => this.handleChange(event, "food")}
          />
        </div>
        <div>
          <input
            type="text"
            name="beverage"
            id="beverage"
            placeholder="Bebidas"
            value={this.state.beverage}
            onChange={event => this.handleChange(event, "beverage")}
          />
        </div>
        <div>
          <input
            type="text"
            name="clientName"
            id="clientName"
            placeholder="Nome do Cliente"
            value={this.state.clientName}
            onChange={event => this.handleChange(event, "clientName")}
          />
        </div>
        <button id="submit" type="submit" onClick={this.handleClick}>
          Enviar Pedido
        </button>
        {this.state.listItem.map(item => {
          return (
            <p>
              {item.food} | {item.beverage} | {item.clientName}
            </p>
          );
        })}
      </section>
    );
  }
}