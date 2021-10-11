import { ActionType } from "./actionTypes"
import {Dispatch} from 'redux'
import { IactionBalance, IactionLogin, ILogin} from "."
import { store } from "../store"

export const depositBalance = (amount: number) => {
  //It would work without the <IactionBalance>, however here we're just enforcing a strict type, and ensuring the dispatch action type is this one
  return {
      type: `${ActionType.BALANCE_DEPOSIT}`,
      payload: amount
    }
}

export const withdrawBalance = (amount: number) => {
   return{
       type: `${ActionType.BALANCE_WITHDRAW}`,
       payload: amount
     }
}

export const login = (credentials: ILogin) => {
       
        // store.dispatch({type: 'LOGIN',
        // payload: credentials})
        return {
          type: 'LOGIN',
          payload: credentials
        }
}