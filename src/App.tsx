import Navbar from '@components/shared/Navbar'
import CardPage from '@pages/Card'
import Home from '@pages/Home'
import Login from '@pages/Login'
import Signup from '@pages/Signup'
import Test from '@pages/Test'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/card/:id" Component={CardPage} />
        <Route path="/signup" Component={Signup} />
        <Route path="/login" Component={Login} />
        <Route path="/test" Component={Test} />
      </Routes>
    </>
  )
}

export default App
