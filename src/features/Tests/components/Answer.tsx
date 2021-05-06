import React, { FC, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '../actions'
import { InputAnswerType } from '../types'
import styles from '../styles.module.sass'

interface IAnswer {
    answer: string
    correct: boolean
    checked: boolean
    type: InputAnswerType
    showResult: boolean | undefined
}

export const Answer: FC<IAnswer> = ({
  answer, correct, checked, type, showResult
}) => {
  const dispatch = useDispatch()
  const typeInput = type === 'multiple' ? 'checkbox' : 'radio'

  const getColor = useCallback(() => {
    if (!showResult) return 'inherit'
    return correct ? '#7eb47e' : '#ff675f'
  }, [showResult])

  const style = {
    color: getColor()
  }

  return (
    <div className={styles.wrapperAnswer} style={style} onClick={() => dispatch(actions.selectAnswer(answer))}>
      <input type={typeInput} readOnly checked={checked} />
      <div className={styles.answer}>{answer}</div>
    </div>
  )
}
