//Will be used essentially for routing proposes 

import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route  exact path="/login" component={} />
      </Switch>
    </Router>
  )
}
