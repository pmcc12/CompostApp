import { ActionType } from "./actionTypes"
import {Dispatch} from 'redux'
import { IactionBalance } from "."

export const depositBalance = (amount: number) => {
  //It would work without the <IactionBalance>, however here we're just enforcing a strict type, and ensuring the dispatch action type is this one
  return (dispatch: Dispatch<IactionBalance>) => {
    dispatch({
      type: ActionType.DEPOSIT,
      payload: amount
    })
  }
}

export const withdrawBalance = (amount: number) => {
  return (dispatch: Dispatch<IactionBalance>) => {
    dispatch({
      type: ActionType.WITHDRAW,
      payload: amount
    })
  }
}

//Action types for the Redux store.

/*
import * as actionTypes from "./actionTypes"

export function addArticle(article: IArticle) {
  const action: ArticleAction = {
    type: actionTypes.ADD_ARTICLE,
    article,
  }

  return simulateHttpRequest(action)
}

export function removeArticle(article: IArticle) {
  const action: ArticleAction = {
    type: actionTypes.REMOVE_ARTICLE,
    article,
  }
  return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: ArticleAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action)
    }, 500)
  }
}
*/