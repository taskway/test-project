import { rootReducer } from '../store/store'
import { actions } from './actions'

type RootReducerType = typeof rootReducer
type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>
export type AppStateType = ReturnType<RootReducerType>
export type RootState = ReturnType<typeof rootReducer>

export type ActionTypes = InferActionsTypes<typeof actions>

export enum APICODES {
    SUCCESS,
    FAILED
}
