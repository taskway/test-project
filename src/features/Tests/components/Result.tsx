import React, { FC } from 'react'
import { TestType } from '../types'
import { Test } from './Test'

interface IResult {
    tests: TestType[]
}

export const Result: FC<IResult> = ({ tests }) => (
  <div>
    {tests.map((test, i) => <Test key={test.question} {...test} showResult />)}
  </div>
)