import FixedBottomButton from '@components/shared/FixedBottomButton'
import Flex from '@components/shared/Flex'
import Spacing from '@components/shared/Spacing'
import TextField from '@components/shared/TextField'
import { css } from '@emotion/react'

const Form = () => {
  return (
    <Flex direction="column" css={FormContainerStyle}>
      <TextField label="이메일" placeholder="이메일을 입력해주세요." />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        type="password"
        placeholder="비밀번호를 입력해주세요."
      />
      <Spacing size={16} />
      <TextField
        label="패스워드 재확인"
        type="password"
        placeholder="비밀번호를 입력해주세요."
      />
      <Spacing size={16} />
      <TextField label="이름" placeholder="이름을 입력해주세요." />
      <FixedBottomButton label="회원가입" onClick={() => {}} disabled />
    </Flex>
  )
}
const FormContainerStyle = css`
  padding: 24px;
`
export default Form
