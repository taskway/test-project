import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '../actions'
import { Button as Btn } from '../../../common/styledComponents'
import styles from '../styles.module.sass'

interface IButton {
    showResult?: boolean
}

export const Button: FC<IButton> = ({ showResult }) => {
  if (showResult) return null
  const dispatch = useDispatch()
  return (
    <div className={styles.containerButton}>
      <Btn onClick={() => dispatch(actions.getNextTest())}>Next</Btn>
    </div>
  )
}
