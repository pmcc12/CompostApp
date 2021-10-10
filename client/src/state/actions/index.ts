import * as AT from './actionTypes' 

interface DepositAction {
    type: AT.ActionType.DEPOSIT,
    payload: number
}

interface WithdrawAction {
    type: AT.ActionType.WITHDRAW,
    payload: number
}

interface ILogin {
    email: string;
    password: string
  }

export type IactionBalance = DepositAction | WithdrawAction;

export type IactionLogin = {
    type: string;
    payload : ILogin;
}
