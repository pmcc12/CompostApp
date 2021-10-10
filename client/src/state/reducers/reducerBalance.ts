import { IactionBalance } from "../actions"
import { ActionType } from "../actions/actionTypes"

const initialState = 0

const BalanceReducer = (state = initialState, action: IactionBalance) => {
    switch (action.type) {

    case ActionType.DEPOSIT:
        return state + action.payload
    case ActionType.WITHDRAW:
        return state - action.payload

    default:
        return state
    }
}

export default BalanceReducer
