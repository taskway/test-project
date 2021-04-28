import { ActionTypes, InitialStateType } from './types'

const initialState: InitialStateType = {
  tests: [],
  currentTest: null
}

export const testsReducer = (state = initialState, action: ActionTypes): typeof initialState => {
  switch (action.type) {
    case 'SET_TESTS':
      return {
        ...state,
        tests: action.payload
      }
    case 'SET_CURRENT_TEST':
      return {
        ...state,
        currentTest: action.payload
      }
    default:
      return state
  }
}
