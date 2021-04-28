import React, { FC } from 'react'
import { AnswerType, InputAnswerType } from '../types'
import { Answer } from './Answer'
import styles from '../styles.module.sass'

interface IAnswers {
    answers: AnswerType[]
    type: InputAnswerType
    showResult: boolean | undefined
}

export const Answers: FC<IAnswers> = ({
  answers, type, showResult
}) => (
  <div className={styles.wrapperAnswers}>
    {answers.map(({ answer, correct, checked }) => (
      <Answer
        key={answer}
        answer={answer}
        correct={correct}
        checked={checked}
        type={type}
        showResult={showResult}
      />
    ))}
  </div>
)
