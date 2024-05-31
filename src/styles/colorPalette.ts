import { css } from '@emotion/react'

export const colorPalette = css`
  :root {
    --red: #f44336;
    --blue: #2196f3;
    --green: #4caf50;
    --white: #fff;
    --black: #212121;
    --borderGray: #efecec;
    --textGray: #868686;
  }
`

export const colors = {
  red: 'var(--red)',
  blue: 'var(--blue)',
  green: 'var(--green)',
  white: 'var(--white)',
  black: 'var(--black)',
  borderGray: 'var(--borderGray)',
  textGray: 'var(--textGray)',
}

export type Colors = keyof typeof colors
