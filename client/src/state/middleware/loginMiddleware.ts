import { Middleware } from "redux"
import { RootState } from "../store"

export const loginMiddleware: Middleware<
{},
RootState
> = store => next => action => {
    if(action.type !== 'LOGIN') {
        console.log('not login!');
        console.log(action.type);
        return next(action)
    };
    console.log('here in middleware')
    console.log(action);
    console.log(store.getState());
    if(action.payload.email === 'miguel@gmail.com'){
        return next({type: `LOGIN_SUCCESS`, payload: action.payload})
    }
    console.log('FAILURE!')
    return next({type: `LOGIN_FAILURE`, payload: action.payload})
}