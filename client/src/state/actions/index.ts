import * as AT from './actionTypes' 

interface DepositAction {
    type: AT.ActionType.BALANCE_DEPOSIT,
    payload: number
}

interface WithdrawAction {
    type: AT.ActionType.BALANCE_WITHDRAW,
    payload: number
}

interface IloginRespObj {
    status: boolean,
    message: string,
    data: dataBackEnd
}

interface dataBackEnd {
    userId: number,
    email: string,
    username: string,
    location?: string,
    balance: number,
    createdAt: string,
    accessToken: string
}

export interface I_initial_Login {
    email: string;
    password: string;
}

// export interface ILogin {
//     email: string;
//     password: string;
//     error: string;
//     loading: boolean;
//     response: IloginRespObj
// }

export type IactionBalance = DepositAction | WithdrawAction;

export type IactionLogin = {
    type: string;
    payload : IloginRespObj;
}
