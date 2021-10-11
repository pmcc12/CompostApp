import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers';
import thunk from "redux-thunk"
import { loginMiddleware } from './middleware/loginMiddleware';

//more than one store is not acceptable in redux
export const store: any = createStore(reducers, applyMiddleware(loginMiddleware));

export type RootState = ReturnType<typeof store.getState> 

// import React from 'react'

// const apiService = {

// }

// apiService.register = (user,headers) => {
//     return(
//         fetch(`http://localhost:3000/register`,{
//             method: 'POST',
//             credentials: 'include',
//             mode:'cors',
//             headers,
//             body: user
//         })
//         .then((res) => res.json())
//         .then((data) => console.log(data))
//         .catch((error) => console.log(error))
//     );
// }

// apiService.login = (user,headers) => {
//     return(
//         fetch(`http://localhost:3000/login`,{
//             method: 'POST',
//             credentials: 'include',
//             mode:'cors',
//             headers,
//             body: user
//         })
//         .then((res) => res.json())
//         .then((data) => console.log(data))
//         .catch((error) => console.log(error))
//     );
// }
