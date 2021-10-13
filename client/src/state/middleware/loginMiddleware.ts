import { Middleware } from "redux"
import { RootState } from "../store"
import { store } from "../store";

export const loginMiddleware: Middleware<
{},
RootState
> = store => next => action => {
    const BASE_URL = process.env.REACT_APP_HOST;
    if(action.type !== 'LOGIN') {
        console.log('you shal not pass login!');
        console.log(action.type);
        return next(action)
    };
    console.log('here in middleware')
    console.log(action);
    const method = 'POST';
    const body = action.payload ? JSON.stringify(action.payload) : undefined;
    const defaultHeaders = {'Content-Type': 'application/json'};
    const headers = {...defaultHeaders}
    fetch(`${BASE_URL}/api/login`,{method,body,headers})
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

    // if(action.payload.email === 'miguel@gmail.com'){
    //     return next({type: `LOGIN_SUCCESS`, payload: action.payload})
    // }
    // console.log('FAILURE!')
    // return next({type: `LOGIN_FAILURE`, payload: action.payload})
}