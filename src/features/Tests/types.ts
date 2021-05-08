import { ThunkAction } from 'redux-thunk'
import { AppStateType, InferActionsTypes } from '../../common/types'
import { actions } from './actions'

export type ActionTypes = InferActionsTypes<typeof actions>
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export type InitialStateType = {
    tests: TestType[]
    currentTest: TestType | null
}

export type AnswerType = {
    answer: string
    correct: boolean
    checked: boolean
}

export type InputAnswerType = 'multiple' | 'boolean'

export type TestType = {
    category: string
    question: string
    answers: AnswerType[]
    isRight: boolean
    correct_answer: string
    incorrect_answers: string[]
    difficulty: DifficultyType
    type: InputAnswerType
}

export type DifficultyType = 'hard' | 'medium' | 'easy'
