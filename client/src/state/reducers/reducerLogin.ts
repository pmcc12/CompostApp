import { IactionLogin } from "../actions"
import { ActionType } from "../actions/actionTypes"

const initialStateLogin = {
    status: true,
    message: '',
    data: {
        userId: 0,
        email: '',
        username: '',
        balance: 0,
        createdAt: '',
        accessToken: ''
    }
}

const LoginReducer = (state = initialStateLogin, action: IactionLogin) => {
    switch (action.type) {
        case ActionType.LOGIN_REQUEST:
            console.log('in reducer request');
            return {...state, loading: true}
        case ActionType.LOGIN_SUCCESS:
            console.log('in reducer');
            return {...state, loading: false, data: action.payload.data, status: action.payload.status}
        case ActionType.LOGIN_FAILURE:
            return {...state, loading: false, error: action.payload.message}
        default:
            return state;
    }
}

export default LoginReducer;
