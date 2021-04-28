import styled from 'styled-components'

export const Button = styled.div`
  text-align: center;
  color: #FFF;
  font-weight: bold;
  background: #51a06c;
  padding: 7px 41px;
  display: inline-block;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.2s;
  &:hover {
    background: #67b689;
  }
`

export const ContainerPage = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`

export const WrapperTests = styled.div`
  width: 700px;
  margin: 15px 0;
`

export const WrapperTest = styled.div`
  border-style: solid;
  border-width: 2px;
  padding: 20px 0;
  border-radius: 5px;
  border-color: ${({ isAright, showResult }: { isAright: boolean, showResult: boolean }) => {
    if (showResult) {
      return isAright ? '#a0d9a2' : '#ffcbcb'
    }
    return '#e5e5e5'
  }
}
`
