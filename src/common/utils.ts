import { APICODES } from './types'
import { AnswerType } from '../features/Tests/types'

export const isSuccessCodeAPI = (responseCode: any) => responseCode === APICODES.SUCCESS

export const compose = (...fns: Function[]) => (...args: any[]) => fns.reduce((composed, f) => f(composed, ...args.slice(1)), args[0])

export const shuffleArr = (arr: AnswerType[]) => arr.sort(() => Math.random() - 0.5)
