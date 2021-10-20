import { IactionBalance } from '../actions';
import { ActionType } from '../actions/actionTypes';

const initialState = 0;

const BalanceReducer = (state = initialState, action: IactionBalance) => {
  switch (action.type) {
    case ActionType.BALANCE_DEPOSIT:
      return state + action.payload;
    case ActionType.BALANCE_WITHDRAW:
      return state - action.payload;
    case ActionType.NEW_BALANCE:
      console.log('inside BalanceReducer ', action.payload);
      return action.payload;

    default:
      return state;
  }
};

export default BalanceReducer;
