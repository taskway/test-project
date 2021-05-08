import React, { FC } from 'react'
import {
  AnswerType, DifficultyType, InputAnswerType
} from '../types'
import { Button } from './Button'
import { WrapperTest } from '../../../common/styledComponents'
import styles from '../styles.module.sass'
import { Answer } from './Answer'

interface ITest {
    category: string
    question: string
    answers: AnswerType[]
    isRight: boolean
    type: InputAnswerType
    difficulty: DifficultyType
    showResult?: boolean
}

export const Test: FC<ITest> = ({
  category, question, answers, isRight, type, difficulty, showResult
}) => (
  <section>
    <WrapperTest isRight={isRight} showResult={!!showResult}>
      <header>
        <h5 style={{ marginBottom: 5 }}>{category}</h5>
        <h3>{question}</h3>
      </header>
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
      <footer>
        {showResult && <h5 className={styles.difficulty}>{difficulty}</h5>}
      </footer>
    </WrapperTest>
    <Button showResult={showResult} />
  </section>
)
