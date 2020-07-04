import React, { useContext } from 'react'

import AuthContext from '../contexts/AuthContext'

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

export default function Routes() {
  const { authenticated } = useContext(AuthContext)

  return authenticated ? <AppRoutes /> : <AuthRoutes />
}
