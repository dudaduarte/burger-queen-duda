import React from "react";
import firebase from "../components/firebaseConfig";
const database = firebase.firestore();

class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: [],
    };
  }

  componentDidMount() {
    database
      .collection("saloon-orders")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ listItem: data });
      });
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
