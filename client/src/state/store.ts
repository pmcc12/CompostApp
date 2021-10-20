import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers';
import { loginMiddleware } from './middleware/loginMiddleware';
import { balanceMiddleware } from './middleware/balanceMiddleware';
import { registerMiddleware } from './middleware/registerMiddleware';


//more than one store is not acceptable in redux
export const store: any = createStore(reducers, applyMiddleware(registerMiddleware,loginMiddleware));

export type RootState = ReturnType<typeof store.getState> 
