import FixedBottomButton from '@components/shared/FixedBottomButton'
import Flex from '@components/shared/Flex'
import Spacing from '@components/shared/Spacing'
import TextField from '@components/shared/TextField'
import { css } from '@emotion/react'
import { FormValues } from '@models/signup'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import validator from 'validator'

const Form = ({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })

  const errors = useMemo(() => validate(formValues), [formValues])

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }))
  }, [])

  //제출가능한 상태인지 체크
  const isSummitable = Object.keys(errors).length !== 0

  // input창이 처음일 경우
  const [dirty, setDirty] = useState<Partial<FormValues>>({})
  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    setDirty((prevDirty) => ({
      ...prevDirty,
      [name]: 'true',
    }))
  }, [])

  return (
    <Flex direction="column" css={FormContainerStyle}>
      <TextField
        label="이메일"
        placeholder="이메일을 입력해주세요."
        name="email"
        value={formValues.email}
        onChange={handleOnChange}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        onBlur={handleBlur}
        helpMessage={Boolean(dirty.email) ? errors.email : ''}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요."
        value={formValues.password}
        onChange={handleOnChange}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        onBlur={handleBlur}
        helpMessage={Boolean(dirty.password) ? errors.password : ''}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드 재확인"
        type="password"
        name="rePassword"
        placeholder="비밀번호를 입력해주세요."
        value={formValues.rePassword}
        onChange={handleOnChange}
        hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
        onBlur={handleBlur}
        helpMessage={Boolean(dirty.rePassword) ? errors.rePassword : ''}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        placeholder="이름을 입력해주세요."
        name="name"
        value={formValues.name}
        onChange={handleOnChange}
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        onBlur={handleBlur}
        helpMessage={Boolean(dirty.name) ? errors.name : ''}
      />
      <FixedBottomButton
        label="회원가입"
        onClick={() => {
          onSubmit(formValues)
        }}
        disabled={isSummitable}
      />
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
  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호를 8자 이상 입력해주세요.'
  } else if (
    validator.equals(formValues.password, formValues.rePassword) === false
  ) {
    errors.rePassword = '비밀번호가 일치하지 않습니다.'
  }
  if (formValues.name.length < 2) {
    errors.name = '이름을 2자 이상 입력해주세요.'
  }
  return errors
}
const FormContainerStyle = css`
  padding: 24px;
  max-width: 480px;
  margin: 0 auto;
`

export default Form
