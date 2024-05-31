import Card from '@pages/Card'
import Home from '@pages/Home'
import Test from '@pages/Test'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/cards/:id" Component={Card} />
        <Route path="/test" Component={Test} />
      </Routes>
    </>
  )
}

export default App
