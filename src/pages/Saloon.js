import React from 'react';
import './Saloon.css';
import Button from '../components/Button';
import firebase from '../firebaseConfig';
import menu from '../Menu.json';
import { Card, Popover, OverlayTrigger, overlay } from 'react-bootstrap';

const database = firebase.firestore();
const firebaseAppAuth = firebase.auth();

class Saloon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideCard: true,
      employeeName: '',
      clientsName: '',
      table: '',
      list: [],
    };

    firebaseAppAuth.onAuthStateChanged(user => {
      database.collection("users").doc(user.uid).get()
        .then(doc => {
          const employeeName = doc.data().displayName;
          this.setState({ employeeName })
        });
    });
  }

  handleHiddenCard = () => {
    this.state.hideCard ?
    this.setState({ hideCard: false }) :
    this.setState({ hideCard: true })
  }

  includeItem = (product, event) => {
    const newProduct = product;
    newProduct.extras.push(event.target.value)
    this.clickProduct(newProduct);
    this.setState({ hideCard: true })
  }

  clickProduct = item => {
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
        employeeName: this.state.employeeName,
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
    const style = this.state.hideCard ? {display: 'none'} : {};

    //eu voltei o popover pra cá porque tinha quebrado quando a gente tirou do render() e eu não tava sabendo consertar :(
    const popover = (
      <Popover id="popover" className="title-orders">
        <h2 className="text-orders">Pedido</h2>
        {this.state.list.map((product, index) => {
          return (
            <div>
              {product.amount} x
              <button className="btn btn-warning btn-m" key={index} onClick={() => this.deleteItem(product)}>
                {product.name}
              </button>
              <span className="text-orders">
                - R${product.price * product.amount}
              </span>
            </div>
          );
        })}
        <h1 className="title-orders">Valor total desse pedido: R${valorTotal} </h1>
        <div className="btn-div">
          <Button className="btn btn-danger" text="Enviar Pedido" onClick={() => this.handleClick} />
          <Button className="btn btn-primary" text="Limpar" onClick={() => this.setState({ list: [] })} />
        </div>
      </Popover>
    );
    
    const Example = () => (
      <OverlayTrigger trigger="click" delay={{ show: 250, hide: 400 }} placement="bottom" overlay={popover} rootClose={false}>
        <button variant="secondary" className="btn-car btn"><i className="fas fa-shopping-cart"></i></button>
      </OverlayTrigger>
    );
    return (
      <section className="get-orders-container">
        <h2 className="hello-text">Olá, {this.state.employeeName}.</h2>
        <Example />
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
              <button className="btn btn-outline-light btn-m" key={index} onClick={() => this.clickProduct(product)}>
                {product.name}
              </button>
            );
          })}
        </div>
        <hr />
        <div>
          <h2 className="title-menu">Menu do Dia</h2>
          {Object.keys(menu.dayMenu).map((title, titleIndex) => {
            return title === 'Hamburgueres' ? 
            (
            <section>
              <h3 key={titleIndex} className="title-day-menu">{title}</h3>
              {
                menu.dayMenu[title].map((product, productIndex) => {
                return (
                  <React.Fragment>
                    <Card bg="dark" style={style} body>
                      <button className="btn btn-m btn-warning" value="hamburguer de frango" onClick={(event) => this.includeItem(product, event)}>
                        Frango
                      </button>
                      <button className="btn btn-m btn-warning" value="hamburguer de carne" onClick={(event) => this.includeItem(product, event)}>
                        Carne de boi
                      </button>
                    </Card>
                    <button
                      className="btn btn-outline-light btn-m"
                      key={productIndex}
                      onClick={() => this.handleHiddenCard()}
                    >
                      {product.name}
                    </button>
                  </React.Fragment>
                )
              })
              }
              </section>
            ) : (
              <section>
              <h3 key={titleIndex} className="title-day-menu">{title}</h3>
              {
                menu.dayMenu[title].map((product, productIndex) => {
                return (
                  <button
                  className="btn btn-outline-light btn-m"
                  key={productIndex}
                  onClick={() => this.clickProduct(product)}
                >
                  {product.name}
                </button>
                )
              })
              }
              </section>
            )
          })}
        </div>
        <hr />
      </section>
    );
  }
}

export default Saloon;
