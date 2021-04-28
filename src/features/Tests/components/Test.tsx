import React, { FC } from 'react'
import {
  AnswerType, DifficultyType, InputAnswerType
} from '../types'
import { Answers } from './Answers'
import { Difficulty } from './Difficulty'
import { Button } from './Button'
import { WrapperTest } from '../../../common/styledComponents'

interface ITest {
    category: string
    question: string
    answers: AnswerType[]
    isAright: boolean
    type: InputAnswerType
    difficulty: DifficultyType
    showResult?: boolean
}

export const Test: FC<ITest> = ({
  category, question, answers, isAright, type, difficulty, showResult
}) => (
  <section>
    <WrapperTest isAright={isAright} showResult={!!showResult}>
      <header>
        <h5 style={{ marginBottom: 5 }}>{category}</h5>
        <h3>{question}</h3>
      </header>
      <Answers
        answers={answers}
        type={type}
        showResult={showResult}
      />
      <footer>
        <Difficulty difficulty={difficulty} showResult={showResult} />
      </footer>
    </WrapperTest>
    <Button showResult={showResult} />
  </section>
)
