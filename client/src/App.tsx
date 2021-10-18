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
import { Details } from './screens/Details';
import Home from './screens/Home';
import { Buy } from './screens/Buy';
import { TopUp } from './screens/TopUp';
import { Success } from './screens/Success';
import MessagesOverview from './screens/MessagesOverview';

export default function App() {
  const state = useSelector((state: myReducersTypeof) => state.login);

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/balance" component={Balance} />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/sell"
          component={() => <Sell authorization={state.auth} />}
        />
        <Route
          exact
          path="/details/:userId"
          component={() => <Details authorization={state.auth} />}
        />

        <Route
          exact
          path="/buy"
          component={() => <Buy authorization={state.auth} />}
        />
        <Route
          exact
          path="/topup/:sellerId"
          component={() => <TopUp authorization={state.auth} />}
        />
        <Route
          exact
          path="/success"
          component={() => <Success authorization={state.auth} />}
        />
        <Route exact path="/messages" component={MessagesOverview} />
        <Route
          exact
          path="/"
          component={() => <Home authorization={state.auth} />}
        />
      </Switch>
    </Router>
  );
}
// <Route exact path="/new" component={()=><AppointmentCreator authorization={userAuth}/>}/>
