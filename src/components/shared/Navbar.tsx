import { css } from '@emotion/react'
import { colors } from '@styles/colorPalette'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button'
import Flex from './Flex'

const Navbar = () => {
  const location = useLocation()
  const showSignButton =
    ['/login', '/signup'].includes(location.pathname) === false

  console.log(showSignButton)
  return (
    <Flex justify="space-between" align="center" css={NavbarContainerStyles}>
      <Link to="/">Home</Link>
      {showSignButton && (
        <Link to="/signup">
          <Button weak>로그인/회원가입</Button>
        </Link>
      )}
    </Flex>
  )
}

const NavbarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.borderGray};
  z-index: var(--dimmed-zindex);
  min-height: 35px;
`
export default Navbar
