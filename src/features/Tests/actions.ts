import { TestType, ThunkType } from './types'
import { testsAPI } from '../../api'
import {
  isSuccessCodeAPI, compose
} from '../../common/utils'
import {
  formatAnswers, shuffleAnswers, updateAnswers, checkCurrectAnswer
} from './utils'

export const actions = {
  setTests: (payload: any) => ({ type: 'SET_TESTS', payload } as const),
  setCurrentTest: (payload: TestType | null) => ({ type: 'SET_CURRENT_TEST', payload } as const)
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

export const selectAnswer = (answer: string): ThunkType => async (dispatch, getState) => {
  const { tests, currentTest } = getState().tests
  if (currentTest) {
    const newTests = tests.map((test) => {
      if (test.question === currentTest?.question) {
        const newTest = compose(
          updateAnswers(answer),
          checkCurrectAnswer
        )(test)
        dispatch(actions.setCurrentTest(newTest))
        return newTest
      }
      return test
    })
    dispatch(actions.setTests(newTests))
  }
}

export const getNextTest = (): ThunkType => async (dispatch, getState) => {
  const { tests, currentTest } = getState().tests
  const currentIndexTest = tests.findIndex((i) => i.question === currentTest?.question)
  if (currentIndexTest > -1) {
    const nextTest = tests[currentIndexTest + 1]
    dispatch(actions.setCurrentTest(nextTest))
  } else {
    dispatch(actions.setCurrentTest(null))
  }
}
