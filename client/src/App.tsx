//Will be used essentially for routing proposes

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './state/actions/actionCreators';
import { myReducersTypeof } from './state/reducers';
import { Login } from './screens/Login';
import Balance from './screens/Balance';
import { Register } from './screens/Register';
import { Sell } from './screens/Sell';
import Home from './screens/Home';

export default function App() {
  const state = useSelector((state: myReducersTypeof) => state.login);

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route exact path="/balance" component={Balance} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/sell" component={Sell} />
      </Switch>
    </Router>
  );
}
