//@ts-nocheck
//Will be used essentially for routing proposes

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import './css/scss/main.css'
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
import MessagesOverview from './screens/MessagesOverview';
import PrivateMessage from './screens/PrivateMessage';
import { TopUp } from './screens/TopUp';
import { Success } from './screens/Success';
import ApiService from './ApiService';
import { useEffect } from 'react';
import { categories } from './handlers/categories';
// Auth Route
// import AuthRoute from './utils/AuthRoute'

export default function App() {
  const state = useSelector((state: myReducersTypeof) => state.login);

  useEffect(() => {
    ApiService.getCategories().then((data) => {
      if (data.length === 0) {
        console.log('HI FROM INSIDE DATA LENGTH CONDITION');
        categories.forEach((category) => {
          ApiService.postCategory(category);
        });
      }
    });
  });

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/balance" component={Balance} />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/sell"
          // component={Sell}
          component={() => <Sell authorization={state.auth} />}
        />
        <Route
          exact
          path="/details/:userId"
          // component={Details}
          component={() => <Details authorization={state.auth} />}
        />

        <Route
          exact
          path="/buy"
          // component={Buy}
          component={() => <Buy authorization={state.auth} />}
        />
        <Route
          exact
          path="/topup/:sellerId"
          component={TopUp}
          // component={() => <TopUp authorization={state.auth} />}
        />
        <Route
          exact
          path="/success"
          // component={Success}
          component={() => <Success authorization={state.auth} />}
        />
        <Route exact path="/messages/:inboxId" component={PrivateMessage} />

        <Route exact path="/messages" component={MessagesOverview} />
        <Route
          exact
          path="/"
          // component={Home}
          component={() => <Home authorization={state.auth} />}
        />
      </Switch>
    </Router>
  );
}
// <Route exact path="/new" component={()=><AppointmentCreator authorization={userAuth}/>}/>
