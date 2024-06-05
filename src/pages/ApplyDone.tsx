import FixedBottomButton from '@components/shared/FixedBottomButton'
import Flex from '@components/shared/Flex'
import Text from '@components/shared/Text'
import { css } from '@emotion/react'
import { parse } from 'qs'
import { useNavigate } from 'react-router-dom'

const ApplyDone = () => {
  const navigate = useNavigate()
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  })
  if (!success) {
    return <Flex>카드 신청을 실패했습니다.</Flex>
  }
  return (
    <Flex align="center" justify="center">
      <Text typography="t2" css={TextStyles}>
        Apply Done!
      </Text>
      <FixedBottomButton
        onClick={() => {
          navigate('/')
        }}
        label="확인"
      />
    </Flex>
  )
}

const TextStyles = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default ApplyDone
