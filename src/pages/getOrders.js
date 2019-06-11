import React from 'react';
import './getOrders.css';
import Button from '../components/Button';
import firebase from '../firebaseConfig';
import withFirebaseAuth from 'react-with-firebase-auth';

const menu = {
  breakfast: [
    {
      name: 'Café Americano',
      price: 5,
    },
    {
      name: 'Café com Leite',
      price: 7,
    },
    {
      name: 'Sanduíche de presunto e queijo',
      price: 10,
    },
    {
      name: 'Suco de fruta natural',
      price: 7,
    },
  ],
  dayMenu: {
    Hamburgueres: [
      {
        name: 'Hamburguer simples',
        price: 10,
      },
      {
        name: 'Hamburguer duplo',
        price: 15,
      },
    ],
    Acompanhamentos: [
      {
        name: 'Batata frita',
        price: 5,
      },
      {
        name: 'Anéis de cebola',
        price: 5,
      },
    ],
    Bebidas: [
      {
        name: 'Água 500ml',
        price: 5,
      },
      {
        name: 'Água 750ml',
        price: 7,
      },
      {
        name: 'Bebida gaseificada 500ml',
        price: 7,
      },
      {
        name: 'Bebida gaseificada 750ml',
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
      clientsName: '',
      table: '',
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
    if (this.state.clientsName && this.state.table && this.state.list !== []) {
      let order = {
        order: this.state.list,
        clientsName: this.state.clientsName,
        table: this.state.table,
      };
      database
        .collection('saloon-orders')
        .add(order)
        .then(() => alert('Pedido enviado com sucesso!'));
      this.setState({
        list: [],
        clientsName: '',
        table: ''
      });
    } else {
      alert('Por favor, insira o nome e a mesa do cliente antes de enviar o pedido.')
    }
  };

  signOut = () => {
    this.props.signOut().then(() => (window.location = '/'));
  };

  render() {
    const valorTotal = this.state.list.reduce((acc, cur) => {
      return acc + cur.amount * cur.price;
    }, 0);
    return (
      <section className="get-orders-container">
        <form>
        <h1 className="title-orders">Informações do Cliente</h1>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="clientsName"
              value={this.state.clientsName}
              onChange={event => this.handleChange(event, "clientsName")}
              placeholder="Nome do cliente"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="table"
              value={this.state.table}
              onChange={event => this.handleChange(event, "table")}
              placeholder="Número da mesa"
            />
          </div>
        </form>
        <hr/>
        <div>
          <h2 className="title-menu">Café da Manhã</h2>
          {menu.breakfast.map((product, index) => {
            return (
              <button className="btn btn-outline-light btn-m" key={index} onClick={() => this.cliqueDaCompra(product)}>
                {product.name}
              </button>
            );
          })}
        </div>
        <hr />
        <div>
          <h2 className="title-menu">Menu do Dia</h2>
          {Object.keys(menu.dayMenu).map((title, titleIndex) => {
            return (
            <section>
              <h3 key={titleIndex} className="title-day-menu">{title}</h3>
              {
                menu.dayMenu[title].map((product, productIndex) => {
                return (
                  <button
                    className="btn btn-outline-light btn-m"
                    key={productIndex}
                    onClick={() => this.cliqueDaCompra(product)}
                  >
                    {product.name}
                  </button>
                );
              })
              }
              </section>
            )
          })}
        </div>
        <hr />
        <h1 class="title-orders">Pedido</h1>
        {this.state.list.map((product, index) => {
          return (
            <div>
              <button className="btn btn-warning btn-m" key={index} onClick={() => this.deleteItem(product)}>
                {product.name}
              </button>
              <span className="text-orders">
                 x {product.amount} - Valor: R${product.price * product.amount}
              </span>
            </div>
          );
        })}
        <hr/>
        <h1 className="title-orders">Preço total: R${valorTotal} </h1>
        <Button className="btn btn-danger" text="Enviar Pedido" onClick={this.handleClick} />
      </section>
    );
  }
}

export default withFirebaseAuth({
  firebaseAppAuth,
})(GetOrders);
