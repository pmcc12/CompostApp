import React from 'react'
import { myReducersTypeof } from '../state/reducers'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actionCreators from '../state/actions/actionCreators'

export default function Balance() {

    //state retrieving
    const state = useSelector((state: myReducersTypeof) => state.balance);

    //actions retrieving
    const dispatch = useDispatch();
    const { depositBalance, withdrawBalance } = bindActionCreators(actionCreators, dispatch);

    return (
        <div className="App">
            <h1>{state}</h1>
            <button onClick={() => depositBalance(1000)}>Deposit</button>
            <button onClick={() => withdrawBalance(500)}>Withdraw</button>
        </div>
    )
}
