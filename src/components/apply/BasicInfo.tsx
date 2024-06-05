import FixedBottomButton from '@components/shared/FixedBottomButton'
import Select from '@components/shared/Select'
import { yearlyOption, creditOption, payOption } from '@constants/apply'
import { css } from '@emotion/react'
import { ApplyValues } from '@models/apply'
import { ChangeEvent, useCallback, useState } from 'react'

type InfoValues = Pick<ApplyValues, 'salary' | 'credit' | 'payDate'>
const BasicInfo = ({
  onNext,
}: {
  onNext: (infoValues: InfoValues) => void
}) => {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    credit: '',
    payDate: '',
  })
  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setInfoValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
    console.log(name, value)
  }, [])
  const submittable = Object.values(infoValues).every((value) => value)

  return (
    <div css={SelectContainerStyles}>
      <Select
        name="salary"
        label="연소득"
        options={yearlyOption}
        value={infoValues.salary}
        defaultValue={yearlyOption[0].label}
        onChange={handleInfoChange}
      />
      <Select
        name="credit"
        label="신용점수"
        options={creditOption}
        value={infoValues.credit}
        defaultValue={creditOption[0].label}
        onChange={handleInfoChange}
      />
      <Select
        name="payDate"
        label="결제일"
        options={payOption}
        value={infoValues.payDate}
        defaultValue={payOption[0].label}
        onChange={handleInfoChange}
      />
      <FixedBottomButton
        onClick={() => {
          onNext(infoValues)
        }}
        label="다음"
        disabled={!submittable}
      />
    </div>
  )
}
const SelectContainerStyles = css`
  padding: 24px;
`

export default BasicInfo
