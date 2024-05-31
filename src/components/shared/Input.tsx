import { colors } from '@styles/colorPalette'
import styled from '@emotion/styled'

const Input = styled.input`
  padding: 0 16px;
  font-size: 15px;
  height: 48px;
  font-weight: 500;
  border: 1px solid ${colors.borderGray};
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;

  ::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: ${colors.blue};
    outline: none;
  }
  &[aria-invalid='true'] {
    border-color: ${colors.red};
  }
`

export default Input
