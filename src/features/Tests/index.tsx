import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { init } from './actions'
import { RootState } from '../../common/types'
import { Test } from './components/Test'
import { Result } from './components/Result'

export const Tests: FC = () => {
  const dispatch = useDispatch()
  const { tests, currentTest } = useSelector((state: RootState) => state.tests)
  useEffect(() => {
    dispatch(init())
  }, [])

  if (currentTest) return <Test {...currentTest} />

  return <Result tests={tests} />
}
