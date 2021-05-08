import { TestType } from './types'
import { compose, shuffleArr } from '../../common/utils'

export const formatAnswer = (answer: string, correct: boolean) => ({
  answer,
  correct,
  checked: false
})

export const formatAnswers = (tests: TestType[]) => tests.reduce((prevValue: TestType[], test) => {
  const incorrectAnswers = test.incorrect_answers.map((answer) => formatAnswer(answer, false))
  const correctAnswer = formatAnswer(test.correct_answer, true)
  const newTest = {
    ...test,
    answers: [...incorrectAnswers, correctAnswer]
  }
  return [...prevValue, newTest]
}, [])

export const shuffleAnswers = (tests: TestType[]) => tests.reduce((prevValue: TestType[], test) => [...prevValue, { ...test, answers: shuffleArr(test.answers) }], [])

export const selectAnswerTest = (answer: string, tests: TestType[], currentTest: TestType | null) => {
  const updatedTestIndex = tests.findIndex((test) => test.question === currentTest?.question)
  const updatedTests = [...tests]
  updatedTests[updatedTestIndex] = compose(
    updateAnswers(answer),
    checkCurrectAnswer
  )(updatedTests[updatedTestIndex])
  return { updatedTests, updatedCurrentTest: updatedTests[updatedTestIndex] }
}

export const updateAnswers = (currentAnswer: string) => (test: TestType) => {
  const { type, answers } = test
  return {
    ...test,
    answers: answers.map((answer) => {
      if (answer.answer === currentAnswer) {
        return { ...answer, checked: !answer.checked }
      }
      return type === 'boolean' ? { ...answer, checked: false } : answer
    })
  }
}

export const checkCurrectAnswer = (test: TestType) => {
  if (test.answers.some((answer) => answer.checked && !answer.correct)) return { ...test, isRight: false }
  if (test.answers.some((answer) => answer.checked && answer.correct)) return { ...test, isRight: true }
  return test
}
