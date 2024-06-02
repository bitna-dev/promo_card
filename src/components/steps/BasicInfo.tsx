import Select from '@components/shared/Select'
import { yearlyOption, creditOption, payOption } from '@constants/apply'
import { ApplyValues } from '@models/apply'
import { useState } from 'react'

type InfoValues = Pick<ApplyValues, 'salary' | 'credit' | 'payDate'>
const BasicInfo = () => {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    credit: '',
    payDate: '',
  })
  return (
    <>
      <Select label="연소득" options={yearlyOption} />
      <Select label="신용점수" options={creditOption} />
      <Select label="결제일" options={payOption} />
    </>
  )
}

export default BasicInfo
