import React from 'react';
import './Kitchen.css';
import firebase from '../firebaseConfig';
import { Card } from 'react-bootstrap';
import Button from '../components/Button'

const database = firebase.firestore();
const firebaseAppAuth = firebase.auth();

class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: [],
      listDone: [],
      employeeName: "",
    };

    firebaseAppAuth.onAuthStateChanged(user => {
      database.collection("users").doc(user.uid).get()
        .then(doc => {
          const employeeName = doc.data().displayName;
          this.setState({ employeeName })
        });
    });
  }

  componentDidMount() {
    database
      .collection('saloon-orders')
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ listItem: data });
      });
  }

  readyBtn() {
    database
      .collection('saloon-orders');
  }

  render() {
    return (
      <div className="kitchen-container">
          <h2 className="hello-text">Olá, {this.state.employeeName}.</h2>
        <div className="df-container">
        {this.state.listItem.map((item, index) => {
          return (
            <Card bg="dark" className="df">
              <div>
                <button className="btn-clock btn"><i class="far fa-clock"></i></button>
                <h2 className="title-text">Enviado por:</h2> {item.employeeName}
                  <h2 className="title-text">Mesa:</h2>{item.table}
                <ul>
                  {item.order.map(product => {
                    return (
                      <li>
                        {product.amount} x <span className="card-product">{product.name}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <Button onClick={this.state.listItem} text="Pronto" className="btn btn-warning" />
            </Card>
          );
        })}
      </div>
      </div>
    );
  }
}

export default Kitchen;
