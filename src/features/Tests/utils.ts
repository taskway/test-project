import { AnswerType, CountCurrectAnswersType, TestType } from './types'
import { compose, shuffleArr } from '../../common/utils'

export const formatAnswer = (answer: string, correct: boolean) => ({
  answer,
  correct,
  checked: false,
  rightChoice: false
})

export const formatAnswers = (tests: TestType[]) => tests.reduce((prevValue: TestType[], test) => {
  const incorrectAnswers = test.incorrect_answers.map((i) => formatAnswer(i, false))
  const correctAnswer = formatAnswer(test.correct_answer, true)
  const newTest = {
    ...test,
    answers: [...incorrectAnswers, correctAnswer]
  }
  return [...prevValue, newTest]
}, [])

export const shuffleAnswers = (tests: TestType[]) => tests.reduce((prevValue: TestType[], test) => [...prevValue, { ...test, answers: shuffleArr(test.answers) }], [])

export const updateAnswers = (answer: string) => (test: TestType) => {
  const { type, answers } = test
  const otherAnswers = (item: AnswerType) => {
    if (type === 'boolean') {
      return { ...item, checked: false }
    }
    return item
  }
  const selectAnswer = (item: AnswerType) => ({ ...item, checked: !item.checked })

  const newAnswers = answers.map((item) => {
    if (item.answer === answer) {
      return selectAnswer(item)
    }
    return otherAnswers(item)
  })
  return {
    ...test,
    answers: newAnswers
  }
}

export const checkCurrectAnswer = (test: TestType) => {
  const answers = countCurrectAnswers(test.answers)
  const updateTestResult = (isAright: boolean) => ({ ...test, isAright })

  if (answers.incorrect > 0) return updateTestResult(false)
  if (answers.correct > 0) return updateTestResult(true)
  return test
}

export const countCurrectAnswers = (answers: AnswerType[]) => answers.reduce((prevValue: CountCurrectAnswersType, answer) => {
  if (answer.checked) {
    if (answer.correct) return { ...prevValue, correct: prevValue.correct + 1 }
    return { ...prevValue, incorrect: prevValue.incorrect + 1 }
  }
  return prevValue
}, { correct: 0, incorrect: 0 })

export const selectAnswerTest = (answer: string, tests: TestType[], currentTest: TestType | null) => {
  let newCurrentTest = null

  const newTests = tests.map((test) => {
    if (test.question === currentTest?.question) {
      const newTest = compose(
        updateAnswers(answer),
        checkCurrectAnswer
      )(test)
      newCurrentTest = newTest
      return newTest
    }
    return test
  })

  return { newTests, newCurrentTest }
}
