import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Global } from '@emotion/react'
import globalStyle from '@styles/globalStyle'
import { AlertContextProvider } from '@contexts/AlertContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthGuard from '@components/auth/AuthGuard'
import { RecoilRoot } from 'recoil'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const client = new QueryClient({
  defaultOptions: {},
})
root.render(
  <>
    <Router>
      <Global styles={globalStyle} />
      <RecoilRoot>
        <ToastContainer autoClose={1500} />
        <QueryClientProvider client={client}>
          <AlertContextProvider>
            <AuthGuard>
              <App />
            </AuthGuard>
          </AlertContextProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </Router>
  </>,
)
