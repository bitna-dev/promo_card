import Form from '@components/login/Form'
import { FormValues } from '@models/login'
import { auth } from '@remote/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const { state } = useLocation()

  const handelSubmit = async (formValues: FormValues) => {
    try {
      const { email, password } = formValues
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      toast.success(`Welcome! ${user.displayName}`)
      if (state) {
        console.log(state)
        navigate(state)
      } else {
        navigate('/')
      }
    } catch (error: any) {
      toast.error('계정정보를 다시 확인해주세요.')
    }
  }
  return (
    <>
      <Form onSubmit={handelSubmit} />
    </>
  )
}

export default Login
