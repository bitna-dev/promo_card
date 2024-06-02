import Agreement from '@components/shared/Agreement'
import FixedBottomButton from '@components/shared/FixedBottomButton'
import { termList } from '@constants/apply'
import { MouseEvent, useCallback, useState } from 'react'

const Terms = ({ onNext }: { onNext: (terms: string[]) => void }) => {
  const [termsAgreement, setTermsAgreement] = useState(() => {
    return termList.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {},
    )
  })
  const agreedAllTerms = Object.values(termsAgreement).every((all) => all)
  const handleAllAgreement = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreement((prevTerms) => {
        return Object.keys(prevTerms).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {},
        )
      })
    },
    [],
  )
  return (
    <div>
      <Agreement>
        <Agreement.Title onChange={handleAllAgreement} checked={agreedAllTerms}>
          약관에 모두 동의
        </Agreement.Title>
        {termList.map(({ id, title, link }) => {
          return (
            <Agreement.Desc
              key={id}
              link={link}
              onChange={(_, checked) => {
                setTermsAgreement((prevTerms) => ({
                  ...prevTerms,
                  [id]: checked,
                }))
              }}
              checked={termsAgreement[id]}
            >
              {title}
            </Agreement.Desc>
          )
        })}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={!agreedAllTerms}
        onClick={() => {
          onNext(Object.keys(termsAgreement))
        }}
      />
    </div>
  )
}

export default Terms
