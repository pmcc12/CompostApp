import {combineReducers} from 'redux'
import LoginReducer from './reducerLogin';
import BalanceReducer from './reducerBalance';


const reducers = combineReducers({
    login: LoginReducer,
    balance: BalanceReducer
})

export default reducers;

export type myReducersTypeof = ReturnType<typeof reducers>
