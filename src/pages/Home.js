import React from "react";
import "./Home.css";
import Button from "../components/Button";
import firebase from "../firebaseConfig";
import withFirebaseAuth from "react-with-firebase-auth";

const firebaseAppAuth = firebase.auth();
const database = firebase.firestore();
const uid = localStorage.getItem("users");

class BtnAccType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accType: ""
    }
  }

  componentDidMount() {
    database
      .collection("users")
      .doc(uid)
      .get()
      .then(doc => {
        this.setState({
          accType: `/${doc.data().accType}`
        })
      });
  };

  handlePageChange = location => {
    this.props.history.push(location);
  };

  render() {
    console.log(this.props);
    // console.log(this.state.accType);
    // this.props.user ? this.props.history.push(this.state.accType) : console.log('nao funfou');
    return (
      <section className="btn-container">
        <Button
          className="btn btn-success btn-first-page"
          text="Login"
          onClick={() => this.handlePageChange("/login")}
        />
        <Button
          className="btn btn-primary btn-first-page"
          text="Criar Conta"
          onClick={() => this.handlePageChange("/create-account")}
        />
      </section>
    );
  }
}

export default BtnAccType;
