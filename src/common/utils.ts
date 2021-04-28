import { APICODES } from './types'

export const isSuccessCodeAPI = (responseCode: any) => responseCode === APICODES.SUCCESS

export const compose = (...fns: Function[]) => (arg: any) => fns.reduce((composed, f) => f(composed), arg)

export const shuffleArr = (arr: any[]) => arr.sort(() => Math.random() - 0.5)
