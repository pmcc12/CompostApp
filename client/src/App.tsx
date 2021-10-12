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
import Home from './screens/Home';

export default function App() {
  const dispatch = useDispatch();

  const state = useSelector((state: myReducersTypeof) => state.balance);

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/balance" component={Balance} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
}
