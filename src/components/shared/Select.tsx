import styled from '@emotion/styled'
import { Option } from '@models/apply'
import { colors } from '@styles/colorPalette'
import { forwardRef, SelectHTMLAttributes } from 'react'
import Flex from './Flex'
import Text from './Text'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: Option[]
}

const BaseSelect = styled.select`
  height: 52px;
  background-color: ${colors.borderGray};
  border: none;
  border-radius: 16px;
  padding: 0 16px;
  cursor: pointer;
  &:disabled {
    color: ${colors.red};
  }
`

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, value, defaultValue, ...props },
  ref,
) {
  return (
    <Flex direction="column">
      {label ? (
        <Text
          typography="t7"
          color="black"
          display="inline-block"
          style={{ marginBottom: 4 }}
        >
          {label}
        </Text>
      ) : null}
      <BaseSelect ref={ref} required value={value} {...props}>
        <option disabled hidden value="">
          {options[0].label}
        </option>
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
    </Flex>
  )
})
export default Select
