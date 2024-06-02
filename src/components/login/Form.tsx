import Button from '@components/shared/Button'
import Flex from '@components/shared/Flex'
import Spacing from '@components/shared/Spacing'
import Text from '@components/shared/Text'
import TextField from '@components/shared/TextField'
import { css } from '@emotion/react'
import { FormValues } from '@models/login'
import { colors } from '@styles/colorPalette'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'

const Form = ({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }))
  }, [])
  const errors = useMemo(() => validate(formValues), [formValues])

  const [dirty, setDirty] = useState<Partial<FormValues>>({})
  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    setDirty((prevDirty) => ({
      ...prevDirty,
      [name]: 'true',
    }))
  }, [])

  //제출가능한 상태인지 체크
  const isSummitable = Object.keys(errors).length !== 0
  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="이메일을 입력해주세요."
        value={formValues.email}
        onChange={handleChange}
        onBlur={handleBlur}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={Boolean(dirty.email) ? errors.email : ''}
      />
      <Spacing size={16} />
      <TextField
        label="비밀번호"
        name="password"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={formValues.password}
        onChange={handleChange}
        onBlur={handleBlur}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty.password) ? errors.password : ''}
      />
      <Spacing size={32} />

      <Button
        size="medium"
        onClick={() => {
          onSubmit(formValues)
        }}
        disabled={isSummitable}
      >
        로그인
      </Button>
      <Spacing size={16} />
      <Link to="/signup" css={LinkStyles}>
        <Text typography="t7" color="textGray">
          아직 계정이 없으신가요?
        </Text>
      </Link>
    </Flex>
  )
}

const validate = (formValues: FormValues) => {
  let errors: Partial<FormValues> = {}
  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요.'
  }
  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8자 이상 입력해주세요.'
  }
  return errors
}
const formContainerStyles = css`
  padding: 24px;
  max-width: 480px;
  margin: 0 auto;
`
const LinkStyles = css`
  text-align: center;
  & > span:hover {
    color: ${colors.blue};
    text-decoration: underline ${colors.blue};
  }
`

export default Form
