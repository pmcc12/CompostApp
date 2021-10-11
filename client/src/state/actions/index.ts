import * as AT from './actionTypes' 

interface DepositAction {
    type: AT.ActionType.BALANCE_DEPOSIT,
    payload: number
}

interface WithdrawAction {
    type: AT.ActionType.BALANCE_WITHDRAW,
    payload: number
}

export interface ILogin {
    email: string;
    password: string
  }

export type IactionBalance = DepositAction | WithdrawAction;

export type IactionLogin = {
    type: string;
    payload : ILogin;
}
