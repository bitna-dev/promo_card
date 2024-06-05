import PrivateRoute from '@components/auth/PrivateRoute'
import Navbar from '@components/shared/Navbar'
import ApplyPage from '@pages/Apply'
import ApplyDone from '@pages/ApplyDone'
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
        <Route path="/signup" Component={Signup} />
        <Route path="/login" Component={Login} />
        <Route path="/card/:id" Component={CardPage} />
        <Route
          path="/apply/:id"
          element={
            <PrivateRoute>
              <ApplyPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/apply/done"
          element={
            <PrivateRoute>
              <ApplyDone />
            </PrivateRoute>
          }
        />
        <Route path="/test" Component={Test} />
      </Routes>
    </>
  )
}

export default App
