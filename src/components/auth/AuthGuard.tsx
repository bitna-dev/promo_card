import { userAtom } from '@atoms/user'
import Loader from '@components/shared/Loader'
import { auth } from '@remote/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [init, setInit] = useState(false)
  const setUser = useSetRecoilState(userAtom)
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      })
    } else {
      setUser(null)
    }
    setInit(true)
  })
  if (init === false) {
    return <Loader full />
  }
  return <>{children}</>
}

export default AuthGuard
