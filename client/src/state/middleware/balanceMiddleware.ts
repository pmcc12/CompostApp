import { Middleware } from "redux"
import { RootState } from "../store"
import { ActionType } from "../actions/actionTypes";

export const balanceMiddleware: Middleware<
{},
RootState
> = store => next => action => {
    console.log('in balance!!')

    if(action.type !== ActionType.BALANCE_DEPOSIT && action.type !== ActionType.BALANCE_WITHDRAW) {
        console.log('inside?')
        console.log(action);
        return next({type: action.type, payload: action.payload});
    }
    console.log('here in BALANCE middleware')
    console.log(action);
    console.log(store.getState());
    return next({type: action.type, payload: action.payload})
    
}