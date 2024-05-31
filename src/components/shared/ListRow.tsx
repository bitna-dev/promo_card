import { css } from '@emotion/react'
import Flex from './Flex'
import Text from './Text'

interface ListRowProps {
  left?: React.ReactNode
  contents?: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
  onClick?: () => void
  as?: 'div' | 'li'
}

const ListRow = ({
  left,
  contents,
  right,
  withArrow,
  onClick,
  as = 'li',
}: ListRowProps) => {
  return (
    <Flex as={as} css={ListRowContainerStyles} align="center" onClick={onClick}>
      <Flex css={ListLeftStyles}>{left}</Flex>
      <Flex css={ListRowContentsStyles}>{contents}</Flex>
      <Flex>{right}</Flex>
      {withArrow ? <IconArrowRight /> : null}
    </Flex>
  )
}
const ListRowTexts = ({
  title,
  subTitle,
}: {
  title: string
  subTitle: string
}) => {
  return (
    <Flex direction="column">
      <Text bold>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

const IconArrowRight = () => {
  return (
    <svg
      fill="none"
      height="20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export default ListRow
ListRow.Texts = ListRowTexts
const ListRowContainerStyles = css`
  padding: 8px 24px;
  cursor: pointer;
`
const ListLeftStyles = css`
  margin-right: 14px;
`
const ListRowContentsStyles = css`
  flex: 1;
`
