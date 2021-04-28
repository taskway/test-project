import React, { FC } from 'react'
import { Tests } from './features/Tests'
import { ContainerPage, WrapperTests } from './common/styledComponents'

export const App: FC = () => (
  <ContainerPage>
    <WrapperTests>
      <Tests />
    </WrapperTests>
  </ContainerPage>
)
