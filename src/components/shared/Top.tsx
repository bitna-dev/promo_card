import { css } from '@emotion/react'
import Flex from './Flex'
import Text from './Text'

interface TopProps {
  title?: string
  subTitle?: string
}

const Top = ({ title, subTitle }: TopProps) => {
  return (
    <Flex direction="column" css={ContainerStyle}>
      <Text typography="t4" bold>
        {title}
      </Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

const ContainerStyle = css`
  padding: 24px;
`
export default Top
