import { TestType, ThunkType } from './types'
import { testsAPI } from '../../api'
import {
  compose
} from '../../common/utils'
import {
  formatAnswers, shuffleAnswers
} from './utils'
import { APICODES } from '../../common/types'

export const actions = {
  setTests: (tests: TestType[]) => ({ type: 'SET_TESTS', tests } as const),
  setCurrentTest: (test: TestType | null) => ({ type: 'SET_CURRENT_TEST', test } as const),
  selectAnswer: (answer: string) => ({ type: 'SELECT_ANSWER', answer } as const),
  getNextTest: () => ({ type: 'GET_NEXT_TEST' } as const)
}

export const init = (): ThunkType => async (dispatch, getState) => {
  const { response_code, results } = await testsAPI.getTests(10)
  if (response_code === APICODES.SUCCESS) {
    const tests = compose(
      formatAnswers,
      shuffleAnswers
    )(results)
    dispatch(actions.setTests(tests))
    dispatch(actions.setCurrentTest(tests[0]))
  }
}
