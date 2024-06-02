import { css } from '@emotion/react'
import { colors } from '@styles/colorPalette'
import React, { MouseEvent } from 'react'
import Flex from './Flex'
import Text from './Text'

const Agreement = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex as="ul" direction="column" css={AgreementContainerStyles}>
      {children}
    </Flex>
  )
}
const AgreementTitle = ({
  children,
  checked,
  onChange,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) => {
  return (
    <Flex as="li" onClick={(e) => onChange(e, !checked)}>
      <IconCheck checked={checked} withCircle />
      <Text bold>{children}</Text>
    </Flex>
  )
}
const AgreementDesc = ({
  children,
  checked,
  onChange,
  link,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
  link?: string
}) => {
  return (
    <Flex as="li" css={AgreementDescStyles}>
      <Flex
        onClick={(e) => {
          onChange(e, !checked)
        }}
      >
        <IconCheck checked={checked} />
        <Text typography="t6">{children}</Text>
      </Flex>
      {link ? (
        <a href={link} target="_blank" rel="noreferrer">
          <Text typography="t7" color="textGray">
            링크
          </Text>
        </a>
      ) : null}
    </Flex>
  )
}

const AgreementContainerStyles = css`
  padding: 24px;
  & li {
    cursor: pointer;
  }
`
const AgreementDescStyles = css`
  display: flex;
  justify-content: space-between;
  & a {
    text-decoration: underline ${colors.borderGray};
  }
  & a:hover {
    text-decoration: underline ${colors.blue};
    & span {
      color: ${colors.blue};
    }
  }
`
Agreement.Title = AgreementTitle
Agreement.Desc = AgreementDesc

const IconCheck = ({
  checked,
  withCircle = false,
}: {
  checked: boolean
  withCircle?: boolean
}) => {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
    >
      <g data-name="Layer 28" id="Layer_28">
        {withCircle ? (
          <path
            fill={checked ? colors.blue : colors.textGray}
            d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z"
          />
        ) : null}

        <path
          fill={checked ? colors.blue : colors.textGray}
          d="M13.67,22a1,1,0,0,1-.73-.32l-4.67-5a1,1,0,0,1,1.46-1.36l3.94,4.21,8.6-9.21a1,1,0,1,1,1.46,1.36l-9.33,10A1,1,0,0,1,13.67,22Z"
        />
      </g>
    </svg>
  )
}
export default Agreement
