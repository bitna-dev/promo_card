import ReactDOM from 'react-dom/client'
import App from './App'
import { Global } from '@emotion/react'
import { globalStyle } from '@styles/globalStyle'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <>
    <Global styles={globalStyle} />
    <App />
  </>,
)
