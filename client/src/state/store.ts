import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers';
import thunk from "redux-thunk"

//more than one store is not acceptable in redux
export const store = createStore(reducers,{}, applyMiddleware(thunk));

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
