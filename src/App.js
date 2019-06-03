import React from 'react';
import './App.css';
// import BtnAccType from './components/SelectAccountType';
// import Login from './components/Login';
import Login from './components/Login';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import SelectAccountType from './components/SelectAccountType';
import getOrders from './components/getOrders';

function App() {
  return (
     <Router>
       <Route path="/" exact component={SelectAccountType} />
       <Route path="/login-saloon" component={Login} />
       <Route path="/login-kitchen" component={Login} />
       <Route path="/get-orders" component={getOrders} />
     </Router>
    // aí pra linkar pra outra pagina:
    // <Link to="banana"> oii </ Link>
  );
}

export default App;
