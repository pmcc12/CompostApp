import { Middleware } from "redux"
import { RootState } from "../store"
import { store } from "../store";

export const registerMiddleware: Middleware<
{},
RootState
> = store => next => action => {
    if(action.type !== 'REGISTER') {
        console.log('you shall not pass register!');
        console.log(action.type);
        return next(action)
    };
    console.log('here in Register')
    console.log(action);
    const method = 'POST';
    const body = action.payload ? JSON.stringify(action.payload) : undefined;
    const defaultHeaders = {'Content-Type': 'application/json'};
    const headers = {...defaultHeaders}
    fetch('http://localhost:5001/register',{method,body,headers})
    .then(res => res.json())
    .then(data => {
        store.dispatch({
            type: `${action.type}_SUCCESS`,
            payload: data
        })
    })
    .catch(error => {
        store.dispatch({
            type: `${action.type}_FAILURE`,
            payload: error
        })
    });

    return next({
        type: `${action.type}_REQUEST`,
    })
}
