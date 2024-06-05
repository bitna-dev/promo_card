import Button from '@components/shared/Button'
import FixedBottomButton from '@components/shared/FixedBottomButton'
import Spacing from '@components/shared/Spacing'
import { css } from '@emotion/react'
import { ApplyValues } from '@models/apply'
import { MouseEvent, useCallback, useState } from 'react'

type CardInfoValues = Pick<ApplyValues, 'isMaster' | 'isHipass' | 'isRf'>

const CardInfo = ({
  onNext,
}: {
  onNext: (cardInfoValues: CardInfoValues) => void
}) => {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfoValues>({
    isMaster: undefined,
    isHipass: undefined,
    isRf: undefined,
  })
  const { isMaster, isHipass, isRf } = cardInfoValues
  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLButtonElement
    setCardInfoValues((prevValue) => ({
      ...prevValue,
      [$button.name]: JSON.parse($button.dataset.value as string),
    }))
  }, [])

  return (
    <div css={CardInfoStyles}>
      <Button.Group title="해외결제">
        <Button
          weak={isMaster === undefined || !isMaster}
          size="medium"
          name="isMaster"
          data-value={true}
          onClick={handleButtonClick}
        >
          Master
        </Button>
        <Button
          name="isMaster"
          size="medium"
          weak={isMaster === undefined || isMaster}
          data-value={false}
          onClick={handleButtonClick}
        >
          국내전용
        </Button>
      </Button.Group>
      <Spacing size={24} />
      <Button.Group title="후불교통기능">
        <Button
          size="medium"
          name="isHipass"
          weak={isHipass === undefined || !isHipass}
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
        <Button
          size="medium"
          name="isHipass"
          weak={isHipass === undefined || isHipass}
          onClick={handleButtonClick}
          data-value={false}
        >
          신청안함
        </Button>
      </Button.Group>
      <Spacing size={24} />

      <Button.Group title="후불하이패스카드">
        <Button
          size="medium"
          name="isRf"
          weak={isRf === undefined || !isRf}
          onClick={handleButtonClick}
          data-value={true}
        >
          신청
        </Button>
        <Button
          size="medium"
          name="isRf"
          weak={isRf === undefined || isRf}
          onClick={handleButtonClick}
          data-value={false}
        >
          신청안함
        </Button>
      </Button.Group>
      <FixedBottomButton
        onClick={() => {
          onNext(cardInfoValues)
        }}
        label="신청하기"
      />
    </div>
  )
}

const CardInfoStyles = css`
  padding: 24px;
`
export default CardInfo
