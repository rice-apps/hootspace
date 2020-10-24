import { StrictMode } from 'react'
import { render } from 'react-dom'

import { ApolloProvider } from '@apollo/client'

import log from 'loglevel'

import { mainClient as client } from './utils/apollo'

import App from './App'
import GlobalStyle from './index.styles'
import 'react-datepicker/dist/react-datepicker.css'

import * as serviceWorker from './serviceWorker'

render(
  <StrictMode>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root')
)

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  log.setLevel('TRACE')
  serviceWorker.unregister()
} else {
  log.setLevel('SILENT')
  serviceWorker.register()
}
