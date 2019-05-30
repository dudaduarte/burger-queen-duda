import React from 'react';
import './App.css';
import BtnAccType from './components/SelectAccountType';
import Login from './components/Login';
import firebase from './firebaseConfig';

const database = firebase.firestore();

function App() {
  return <Login />;
}

export default App;
