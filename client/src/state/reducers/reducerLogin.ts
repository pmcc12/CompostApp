import { IactionLogin } from "../actions"
import { ActionType } from "../actions/actionTypes"

const initialStateLogin = {
    email: '',
    password: '',
    loading: false,
    error: {},
    response: {}
}

const LoginReducer = (state = initialStateLogin, action: IactionLogin) => {
    switch (action.type) {
        case ActionType.LOGIN_REQUEST:
            return {...state, loading: true}
        case ActionType.LOGIN_SUCCESS:
            return {...state, loading: false, response: action.payload}
        case ActionType.LOGIN_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}

export default LoginReducer;
