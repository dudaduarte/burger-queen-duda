import React from 'react';
import firebase from '../firebaseConfig';
const database = firebase.firestore();

class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: [],
      listDone: [],
    };
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
      <React.Fragment>
        {this.state.listItem.map((item, index) => {
          return (
            <React.Fragment>
              <p key={index}>
                Cliente: {item.clientsName} - Mesa: {item.table}
              </p>
              <span>
                <button onClick={this.state.listItem}>Pronto</button>
              </span>
              <ul>
                {item.order.map(product => {
                  return (
                    <li>
                      {product.amount} x {product.name}
                    </li>
                  );
                })}
              </ul>
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }
}

export default Kitchen;
