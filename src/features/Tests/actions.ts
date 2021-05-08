import { TestType, ThunkType } from './types'
import { testsAPI } from '../../api'
import {
  isSuccessCodeAPI, compose
} from '../../common/utils'
import {
  formatAnswers, shuffleAnswers
} from './utils'

export const actions = {
  setTests: (tests: TestType[]) => ({ type: 'SET_TESTS', tests } as const),
  setCurrentTest: (test: TestType | null) => ({ type: 'SET_CURRENT_TEST', test } as const),
  selectAnswer: (answer: string) => ({ type: 'SELECT_ANSWER', answer } as const),
  getNextTest: () => ({ type: 'GET_NEXT_TEST' } as const)
}

export const init = (): ThunkType => async (dispatch, getState) => {
  const { response_code, results } = await testsAPI.getTests(10)
  if (isSuccessCodeAPI(response_code)) {
    const tests = compose(
      formatAnswers,
      shuffleAnswers
    )(results)
    dispatch(actions.setTests(tests))
    dispatch(actions.setCurrentTest(tests[0]))
  }
}
