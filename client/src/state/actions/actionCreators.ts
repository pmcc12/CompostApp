import { ActionType } from "./actionTypes"
import {Dispatch} from 'redux'
import { IactionBalance, IactionLogin, I_initial_Login} from "."
import { store } from "../store"

export const depositBalance = (amount: number) => {
  //It would work without the <IactionBalance>, however here we're just enforcing a strict type, and ensuring the dispatch action type is this one
  return {
      type: 'BALANCE_DEPOSIT',
      payload: amount
    }
}

export const withdrawBalance = (amount: number) => {
   return {
       type: 'BALANCE_WITHDRAW',
       payload: amount
     }
}

export const login = (credentials: I_initial_Login) => {
 
        return {
          type: 'LOGIN',
          payload: credentials
        }
}