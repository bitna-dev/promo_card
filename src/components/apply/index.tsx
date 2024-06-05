import useUser from '@hooks/auth/useUser'
import { ApplyValues, APPLY_STATUS } from '@models/apply'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BasicInfo from './BasicInfo'
import CardInfo from './CardInfo'
import Terms from './Terms'

const Apply = ({
  onSubmit,
}: {
  onSubmit: (applyValues: ApplyValues) => void
}) => {
  const { id } = useParams() as { id: string }
  const user = useUser()
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    userId: user?.uid,
    cardId: id,
  })
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (step === 3) {
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    }
  }, [applyValues, step, onSubmit])

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    console.log(terms)
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
    }))
    setStep((prevStep) => prevStep + 1)
  }
  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'credit' | 'payDate'>,
  ) => {
    console.log(infoValues)
    setApplyValues((prevValues) => ({
      ...prevValues,
      infoValues,
    }))
    setStep((prevStep) => prevStep + 1)
  }
  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isMaster' | 'isHipass' | 'isRf'>,
  ) => {
    console.log(cardInfoValues)
    setApplyValues((prevValues) => ({
      ...prevValues,
      cardInfoValues,
    }))
    setStep((prevStep) => prevStep + 1)
  }

  return (
    <>
      {step === 0 ? (
        <Terms onNext={handleTermsChange} />
      ) : step === 1 ? (
        <BasicInfo onNext={handleBasicInfoChange} />
      ) : (
        <CardInfo onNext={handleCardInfoChange} />
      )}
    </>
  )
}

export default Apply
