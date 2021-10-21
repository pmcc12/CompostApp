import React from 'react';
import { myReducersTypeof } from '../state/reducers';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../state/actions/actionCreators';
import { Nav } from 'react-bootstrap';
import Navigation from '../components/Navigation';

export default function Balance() {
  const clickHandlerDeposit = () => {
    console.log('deposit clicked!');
    dispatch(actionCreators.depositBalance(500));
    // depositBalance(500);
  };

  const clickHandlerWithdraw = () => {
    console.log('Withdraw clicked!');
    dispatch(actionCreators.withdrawBalance(200));
  };

  //state retrieving
  const balance = useSelector(
    (state: myReducersTypeof) => state.login.data.balance
  );

  //actions retrieving
  const dispatch = useDispatch();
  // const { depositBalance, withdrawBalance } = bindActionCreators(actionCreators, dispatch);

  return (
    <>
      <Navigation />
      <div className="App">
        <h1>{balance}</h1>
        <button onClick={clickHandlerDeposit}>Deposit</button>
        <button onClick={clickHandlerWithdraw}>Withdraw</button>
      </div>
    </>
  );
}
