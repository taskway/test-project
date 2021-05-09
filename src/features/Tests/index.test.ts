import { testsReducer } from './reducer'
import { actions, init } from './actions'
import { testsAPI } from '../../api'
import { DifficultyType, InputAnswerType } from './types'
import {
  checkCurrectAnswer, formatAnswer, formatAnswers, selectAnswerTest, shuffleAnswers, updateAnswers
} from './utils'
import { ResGetTestsType } from '../../api/types'
import { APICODES } from '../../common/types'
import { compose } from '../../common/utils'

jest.mock('../../api')
const testsAPIMock = testsAPI as jest.Mocked<typeof testsAPI>
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

const firstTest = {
  category: 'Sport',
  question: 'Jordan Michael number player',
  answers: [
    {
      answer: '23',
      correct: true,
      checked: true
    },
    {
      answer: '24',
      correct: false,
      checked: false
    },
    {
      answer: '25',
      correct: false,
      checked: false
    },
    {
      answer: '26',
      correct: false,
      checked: false
    }
  ],
  correct_answer: '21',
  incorrect_answers: [''],
  isRight: false,
  difficulty: 'easy' as DifficultyType,
  type: 'multiple' as InputAnswerType
}
const secondTest = {
  category: 'Entertainment: Film',
  question: 'Who starred in the film 1973 movie &quot;Enter The Dragon&quot;?',
  answers: [
    {
      answer: 'Bruce Lee',
      correct: true,
      checked: false
    },
    {
      answer: 'Jackie Chan',
      correct: false,
      checked: false
    },
    {
      answer: 'Jet Li',
      correct: false,
      checked: false
    },
    {
      answer: 'Yun-Fat Chow',
      correct: false,
      checked: false
    }
  ],
  correct_answer: '',
  incorrect_answers: [''],
  isRight: false,
  difficulty: 'easy' as DifficultyType,
  type: 'multiple' as InputAnswerType
}
const state = {
  tests: [
    firstTest,
    secondTest
  ],
  currentTest: firstTest
}

const response: ResGetTestsType = {
  response_code: APICODES.SUCCESS,
  results: [firstTest, secondTest]
}

testsAPIMock.getTests.mockReturnValue(Promise.resolve(response))

describe('Tests thunk', () => {
  test('init tests', async () => {
    const thunk = init()
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(2)
    const updatedTests = compose(
      formatAnswers,
      shuffleAnswers
    )(response.results)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setTests(updatedTests))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setCurrentTest(updatedTests[0]))
  })
})

describe('Tests utils', () => {
  test('should be return formatted answer', () => {
    const formattedAnswer = formatAnswer('answer', true)
    expect(formattedAnswer).toEqual({
      answer: 'answer',
      correct: true,
      checked: false
    })
  })

  test('the current test should become null', () => {
    const action = actions.setCurrentTest(null)
    const updatedState = testsReducer(state, action)
    expect(updatedState.currentTest).toBeNull()
  })

  test('the test answer must be correct', () => {
    const updatedTest = checkCurrectAnswer(firstTest)
    expect(updatedTest.isRight).toBeTruthy()
  })

  test('should be selected answer in current test', () => {
    const { updatedTests, updatedCurrentTest } = selectAnswerTest('Bruce Lee', state.tests, secondTest)
    expect(updatedTests[1].answers).toContainEqual({
      answer: 'Bruce Lee',
      correct: true,
      checked: true
    })
    expect(updatedCurrentTest.answers).toEqual([
      {
        answer: 'Bruce Lee',
        correct: true,
        checked: true
      },
      {
        answer: 'Jackie Chan',
        correct: false,
        checked: false
      },
      {
        answer: 'Jet Li',
        correct: false,
        checked: false
      },
      {
        answer: 'Yun-Fat Chow',
        correct: false,
        checked: false
      }
    ])
  })

  test('the test must have the specified answer selected', () => {
    const selectedAnswer = updateAnswers('24')
    const updatedTest = selectedAnswer(firstTest)
    expect(updatedTest.answers).toContainEqual({
      answer: '24',
      correct: false,
      checked: true
    })
  })
})
