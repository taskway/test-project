import React, { FC } from 'react'
import { TestType } from '../types'
import { Test } from './Test'

interface IResult {
    tests: TestType[]
}

export const Result: FC<IResult> = ({ tests }) => (
  <>
    {tests.map((test) => <Test key={test.question} {...test} showResult />)}
  </>
)
