import { IactionLoginRegister } from "../actions"
import { ActionType } from "../actions/actionTypes"

const initialStateLogin = {
    loading: false,
    status: true,
    message: '',
    error: '',
    auth: false,
    data: {
        userId: 0,
        email: '',
        username: '',
        balance: 0,
        createdAt: '',
        accessToken: '',
        location: {}
    }
}

const LoginReducer = (state = initialStateLogin, action: IactionLoginRegister) => {
    switch (action.type) {
        case ActionType.LOGIN_REQUEST:
            console.log('in reducer request');
            return {...state, loading: true}
        case ActionType.LOGIN_SUCCESS:
            console.log('in reducer');
            return {...state, loading: false, data: action.payload.data, status: action.payload.status, auth: true}
        case ActionType.LOGIN_FAILURE:
            return {...state, loading: false, error: action.payload.message}
        default:
            return state;
    }
}

export default LoginReducer;
