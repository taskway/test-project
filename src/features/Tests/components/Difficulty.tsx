import React, { FC, useCallback } from 'react'
import { DifficultyType } from '../types'
import styles from '../styles.module.sass'

interface IDifficulty {
    difficulty: DifficultyType
    showResult: boolean | undefined
}

export const Difficulty: FC<IDifficulty> = ({ difficulty, showResult }) => {
  if (!showResult) return null
  return (
    <h5 className={styles.difficulty}>{difficulty}</h5>
  )
}
