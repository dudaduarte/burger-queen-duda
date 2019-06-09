import React from "react";
import "./Login.css";
import Button from "./Button";
import firebase from "./firebaseConfig";
import withFirebaseAuth from "react-with-firebase-auth";

const menu = {
  breakfast: [
    {
      name: "Café Americano",
      price: 5,
    },
    {
      name: "Café com Leite",
      price: 7,
    },
    {
      name: "Sanduíche de presunto e queijo",
      price: 10,
    },
    {
      name: "Suco de fruta natural",
      price: 7,
    },
  ],
  dayMenu: {
    Hamburgueres: [
      {
        name: "Hamburguer simples",
        price: 10,
      },
      {
        name: "Hamburguer duplo",
        price: 15,
      },
    ],
    Acompanhamentos: [
      {
        name: "Batata frita",
        price: 5,
      },
      {
        name: "Anéis de cebola",
        price: 5,
      },
    ],
    Bebidas: [
      {
        name: "Água 500ml",
        price: 5,
      },
      {
        name: "Água 750ml",
        price: 7,
      },
      {
        name: "Bebida gaseificada 500ml",
        price: 7,
      },
      {
        name: "Bebida gaseificada 750ml",
        price: 10,
      },
    ],
  },
};

const database = firebase.firestore();
const firebaseAppAuth = firebase.auth();

class GetOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientsName: "",
      table: "",
      list: [],
    };
  }

  cliqueDaCompra = item => {
    const itemIndex = this.state.list.findIndex(product => {
      return product.name === item.name;
    });
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        amount: 1,
      };
      this.setState({
        list: this.state.list.concat(newItem),
      });
    } else {
      const newList = this.state.list;
      newList[itemIndex].amount += 1;
      this.setState({
        list: newList,
      });
    }
  }; 

  handleChange = (event, element) => {
    const newState = this.state;
    newState[element] = event.target.value;
    this.setState(newState);
  };

  deleteItem = item => {
    const itemIndex = this.state.list.findIndex(product => {
      return product.name === item.name;
    });
    const newList = this.state.list;
    newList[itemIndex].amount -= 1;
    const amount = newList[itemIndex].amount;
    if (amount > 0) {
      this.setState({
        list: newList,
      });
    } else {
      newList.splice(itemIndex, 1);
      this.setState({
        list: newList,
      });
    }
  };

  handleClick = () => {
    let order = {
      order: this.state.list,
      clientsName: this.state.clientsName,
      table: this.state.table,
    };
    database
      .collection("saloon-orders")
      .add(order)
      .then(() => alert("Pedido enviado com sucesso!"));
    this.setState({
      list: [],
      clientsName: "",
      table: ""
    });
  };

  signOut = () => {
    this.props.signOut().then(() => (window.location = "/"));
  };

  render() {
    const valorTotal = this.state.list.reduce((acc, cur) => {
      return acc + cur.amount * cur.price;
    }, 0);
    return (
      <React.Fragment>
        <div>
          <input
            type="text"
            id="clientsName"
            placeholder="Nome do Cliente"
            value={this.state.clientsName}
            onChange={event => this.handleChange(event, "clientsName")}
          />
        </div>
        <div>
          <input
            type="text"
            id="table"
            placeholder="Número da Mesa"
            value={this.state.table}
            onChange={event => this.handleChange(event, "table")}
          />
        </div>
        <div>
          <h1>Café da Manhã</h1>
          {menu.breakfast.map((product, index) => {
            return (
              <button key={index} onClick={() => this.cliqueDaCompra(product)}>
                {product.name}
              </button>
            );
          })}
        </div>
        <hr />
        <div>
          <h1>Menu do dia</h1>
          {Object.keys(menu.dayMenu).map((title, titleIndex) => {
            return (
            <React.Fragment>
              <div key={titleIndex}>{title}</div>
              {
                menu.dayMenu[title].map((product, productIndex) => {
                return (
                  <button
                    key={productIndex}
                    onClick={() => this.cliqueDaCompra(product)}
                  >
                    {product.name}
                  </button>
                );
              })
              }
              </React.Fragment>
            )
          })}
        </div>
        <hr />
        {this.state.list.map((product, index) => {
          return (
            <div>
              <button key={index} onClick={() => this.deleteItem(product)}>
                {product.name}
              </button>
              <span>
                x{product.amount} - Preço: {product.price * product.amount}
              </span>
            </div>
          );
        })}
        <h1>Total</h1>
        <p>Valor total: {valorTotal}</p>
        <Button text="Enviar Pedido" onClick={this.handleClick} />
        <hr />
        <Button text="Sair" onClick={this.signOut} />
      </React.Fragment>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(GetOrders);
