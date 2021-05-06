import { ActionTypes, InitialStateType } from './types'
import { selectAnswerTest } from './utils'

const initialState: InitialStateType = {
  tests: [],
  currentTest: null
}

export const testsReducer = (state = initialState, action: ActionTypes): typeof initialState => {
  switch (action.type) {
    case 'SET_TESTS':
      return {
        ...state,
        tests: action.payload.tests
      }
    case 'SET_CURRENT_TEST':
      return {
        ...state,
        currentTest: action.payload
      }
    case 'SELECT_ANSWER': {
      const { tests, currentTest } = state
      const { newTests, newCurrentTest } = selectAnswerTest(action.payload.answer, tests, currentTest)
      return {
        ...state,
        tests: newTests,
        currentTest: newCurrentTest
      }
    }
    case 'GET_NEXT_TEST': {
      const { tests, currentTest } = state
      const indexCurrentTest = tests.findIndex((i) => i.question === currentTest?.question)
      let nextTest = null
      if (indexCurrentTest > -1) {
        nextTest = tests[indexCurrentTest + 1]
      }
      return {
        ...state,
        currentTest: nextTest
      }
    }
    default:
      return state
  }
}
