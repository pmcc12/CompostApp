import { combineReducers } from 'redux';
import LoginReducer from './reducerLogin';
// import BalanceReducer from './reducerBalance';
import RegisterReducer from './reducerRegister';

const reducers = combineReducers({
  login: LoginReducer,
  // balance: BalanceReducer,
  register: RegisterReducer,
});

export default reducers;

export type myReducersTypeof = ReturnType<typeof reducers>;
