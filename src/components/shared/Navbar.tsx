import { css } from '@emotion/react'
import { colors } from '@styles/colorPalette'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useUser from '@hooks/auth/useUser'
import Button from './Button'
import Flex from './Flex'
import Text from './Text'
import { useCallback } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@remote/firebase'
import { toast } from 'react-toastify'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const showSignButton =
    ['/login', '/signup'].includes(location.pathname) === false

  const user = useUser()
  const handleLogout = useCallback(() => {
    signOut(auth).then((res) => {
      try {
        toast.success('로그아웃되었습니다.')
        navigate('/')
      } catch (error: any) {
        toast.error(error.code)
      }
    })
  }, [navigate])

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Button weak onClick={handleLogout} style={{ border: 'none' }}>
          로그아웃
        </Button>
      )
    }
    if (showSignButton) {
      return (
        <Link to="/login">
          <Button style={{ border: 'none' }} weak>
            로그인/회원가입
          </Button>
        </Link>
      )
    }
    return null
  }, [user, showSignButton, handleLogout])

  console.log(showSignButton)
  return (
    <Flex justify="space-between" align="center" css={NavbarContainerStyles}>
      <Link to="/">
        <Text color="black" bold>
          Promo
        </Text>
      </Link>
      {renderButton()}
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
