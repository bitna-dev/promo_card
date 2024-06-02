import BasicInfo from '@components/steps/BasicInfo'
import CardInfo from '@components/steps/CardInfo'
import Terms from '@components/steps/Terms'
import { useState } from 'react'

const ApplyPage = () => {
  const [step, setStep] = useState(1)
  const handleTermsChange = (terms: string[]) => {
    console.log(terms)
  }
  return (
    <>
      {step === 0 ? (
        <Terms onNext={handleTermsChange} />
      ) : step === 1 ? (
        <BasicInfo />
      ) : (
        <CardInfo />
      )}
    </>
  )
}

export default ApplyPage
