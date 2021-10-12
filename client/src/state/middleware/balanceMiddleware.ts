import { Middleware } from "redux"
import { RootState } from "../store"
import { ActionType } from "../actions/actionTypes";

export const balanceMiddleware: Middleware<
{},
RootState
> = store => next => action => {
    console.log('in balance!!')

    if(action.type !== ActionType.BALANCE_DEPOSIT && action.type !== ActionType.BALANCE_WITHDRAW) {
        console.log('you shall not pass balance middleware')
        console.log('action type: '+action.type);
        console.log('action payload: '+action.payload);
        return next({type: action.type, payload: action.payload});
    }
    console.log('here in BALANCE middleware')
    console.log(action);
    console.log(store.getState());
    return next({type: action.type, payload: action.payload})
    
}