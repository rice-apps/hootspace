import { BrowserRouter as Router } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import CustomRoutes from './components/Routes'

function App () {
  return (
    <HelmetProvider>
      <Router>
        <CustomRoutes />
      </Router>
    </HelmetProvider>
  )
}

export default App
