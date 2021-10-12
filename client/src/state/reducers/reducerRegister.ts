import { IactionLoginRegister, IactionLocationUpdate } from "../actions"
import { ActionType } from "../actions/actionTypes"

const initialStateLogin = {
    loading: false,
    status: true,
    message: '',
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

const RegisterReducer = (state = initialStateLogin, action: IactionLoginRegister) => {
    switch (action.type) {
        case ActionType.REGISTER_REQ:
            console.log('in reducer request');
            return {...state, loading: true}
        case ActionType.REGISTER_SUC:
            console.log('in reducer');
            return {...state, loading: false, data: action.payload.data, status: action.payload.status}
        case ActionType.REGISTER_FAIL:
            return {...state, loading: false, error: action.payload.message}
        default:
            return state;
    }
}

export default RegisterReducer;