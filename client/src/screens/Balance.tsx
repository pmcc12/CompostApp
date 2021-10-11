
import React from 'react'
import { myReducersTypeof } from '../state/reducers'
import { useSelector, useDispatch } from 'react-redux'
import * as actionCreators from '../state/actions/actionCreators'

export default function Balance() {

    const clickHandlerDeposit = () => {
        console.log('deposit clicked!')
        dispatch(actionCreators.depositBalance(500));
        // depositBalance(500);
    }

    const clickHandlerWithdraw = () => {
        console.log('Withdraw clicked!')
        dispatch(actionCreators.withdrawBalance(200));
    }

    //state retrieving
    const state = useSelector((state: myReducersTypeof) => state.balance);

    //actions retrieving
    const dispatch = useDispatch();
    // const { depositBalance, withdrawBalance } = bindActionCreators(actionCreators, dispatch);



    return (
        <div className="App">
            <h1>{state}</h1>
            <button onClick={clickHandlerDeposit}>Deposit</button>
            <button onClick={clickHandlerWithdraw}>Withdraw</button>
        </div>
    )
}