import { Middleware } from "redux"
import { RootState } from "../store"

export const loginMiddleware: Middleware<
{},
RootState
> = store => next => action => {
    console.log(action);
    console.log(store.getState())
}