// import React from 'react'
// import { connect } from 'react-redux'
import { ILogin } from "../../type";

const initialStateLogin = {
    email: 'johndoe@gmail.com',
    password: 'secret'
}

type IactionLogin = {
    type: string;
    payload? : ILogin;
}

const LoginReducer = (state = initialStateLogin, action: IactionLogin) => {
    switch (action.type) {
        case "LOGIN":
            return 
        default:
            break;
    }
}

const initialStateBalance = 0;

type IactionBalance = {
    type: string;
    payload : number;
}

const BalanceReducer = (state: number = initialStateBalance,action: IactionBalance) => {
    switch (action.type){
        case "BALANCE_DEPOSIT":
            return state + action.payload;
        case "BALANCE_WITHDRAW":
            return state - action.payload;
        default:
            return state;
    }
}

export default BalanceReducer;

// export const reducer = (props) => {

// }

// const mapStateToProps = (state) => ({
    
// })

// const mapDispatchToProps = {
    
// }

// export default connect(mapStateToProps, mapDispatchToProps)(reducer)
