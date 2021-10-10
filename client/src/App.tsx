//Will be used essentially for routing proposes 

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actionCreators from './state/actions/actionCreators'
import { myReducersTypeof } from './state/reducers'
import { Login } from './screens/Login'

export default function App() {

  const dispatch = useDispatch();

  const { depositBalance, withdrawBalance } = bindActionCreators(actionCreators, dispatch);

  //escolho o state.balance
  const state = useSelector((state: myReducersTypeof) => state.balance)

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login}/>
      </Switch>
    </Router>
  )
}

// return (
//   <div className="App">
//      <h1>{state}</h1>
//      <button onClick={() => depositBalance(1000)}>Deposit</button>
//      <button onClick={() => withdrawBalance(500)}>Withdraw</button>
//   </div>
// )