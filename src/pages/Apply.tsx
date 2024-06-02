import BasicInfo from '@components/steps/BasicInfo'
import CardInfo from '@components/steps/CardInfo'
import Terms from '@components/steps/Terms'
import { useState } from 'react'

const ApplyPage = () => {
  const [step, setStep] = useState(0)
  return (
    <>{step === 0 ? <Terms /> : step === 1 ? <BasicInfo /> : <CardInfo />}</>
  )
}

export default ApplyPage
