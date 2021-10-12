import { Middleware } from "redux"
import { RootState } from "../store"
import { store } from "../store";

export const registerMiddleware: Middleware<
{},
RootState
> = store => next => action => {
    const BASE_URL = process.env.REACT_APP_HOST;
    if(action.type !== 'REGISTER' && action.type !== 'GET_LOCATION') {
        console.log('you shall not pass register!');
        console.log(action.type);
        return next(action)
    };

    const success = (location: any) => {
        // location.coords.latitude
        store.dispatch({
            type: `${action.type}_SUCCESS`,
            payload: {
                availability: true,
                error: false,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
        })
    }

    const error = (error: any) => {
        store.dispatch({
            type: `${action.type}_FAILURE`,
            payload: {
                availability: false,
                error: true,
            }
        })
    }

    if(action.type === 'GET_LOCATION'){
        navigator.geolocation.getCurrentPosition(success,error);
    }

    console.log('here in Register')
    console.log(action);
    const method = 'POST';
    const body = action.payload ? JSON.stringify(action.payload) : undefined;
    const defaultHeaders = {'Content-Type': 'application/json'};
    const headers = {...defaultHeaders}
    fetch(`${BASE_URL}/register`,{method,body,headers})
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
