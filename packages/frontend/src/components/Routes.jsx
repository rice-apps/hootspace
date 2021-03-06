import { Navigate, Route, useRoutes } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import Feed from './PostFeedWithData'
import Login from './Login'
import MoreInfo from './MoreInfo'
import ProfilePage from './Profile'
import PostFull from './PostFull'
import Calendar404 from './Calendar404'
import Mail404 from './Mail404'
import AboutPage from './About'
import { currentUser, loadToken, mainClient } from '../utils/apollo'
import { VERIFY_USER } from '../graphql/Queries'
import { TOKEN_NAME } from '../config'

function PrivateRoute ({ element, ...rest }) {
  const token = loadToken()

  const { data, loading, error } = useQuery(VERIFY_USER, {
    variables: { token: token },
    errorPolicy: 'none'
  })

  if (error) {
    window.localStorage.clear()
    mainClient.clearStore()

    return <Navigate to='/login' />
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (!data || !data.verifyToken) {
    window.localStorage.clear()
    mainClient.clearStore()

    return <Navigate to='/login' />
  }

  window.localStorage.setItem(TOKEN_NAME, data.verifyToken.token)

  if (
    typeof data.verifyToken.college !== 'undefined' ||
    data.verifyToken.majors !== null
  ) {
    currentUser(data.verifyToken)
  }

  return <Route {...rest} element={element} />
}

const routesArray = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/feed',
    element: <PrivateRoute element={<Feed />} />
  },
  {
    path: '/posts/:postID',
    element: <PrivateRoute element={<PostFull />} />
  },
  {
    path: '/info',
    element: <PrivateRoute element={<MoreInfo />} />
  },
  {
    path: '/profile',
    element: <PrivateRoute element={<ProfilePage />} />
  },
  {
    path: '/about',
    element: <PrivateRoute element={<AboutPage />} />
  },
  {
    path: '/',
    element: <Navigate to='/feed' replace />
  },
  {
    path: '/calendar',
    element: <PrivateRoute element={<Calendar404 />} />
  },
  {
    path: '/mail',
    element: <PrivateRoute element={<Mail404 />} />
  }
]

function CustomRoutes () {
  return useRoutes(routesArray)
}

export default CustomRoutes
