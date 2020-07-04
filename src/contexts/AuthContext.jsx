import React, { createContext, useState, useEffect } from 'react'

import api from '../services/api'

const AuthContext = createContext({})

export default AuthContext

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storagedToken = sessionStorage.getItem('@tindev:token')

    if (storagedToken) setToken(storagedToken)
  }, [])

  async function signIn({ email, password }) {
    const response = await api
      .post('/sessions', { email, password })
      .catch(error => console.log(error.response.data))

    if (response && response.data.token) {
      sessionStorage.setItem('@tindev:token', response.data.token)
      setToken(response.data.token)

      return !!response.data.token
    }

    return false
  }

  async function signUp({ firstName, lastName, username, email, password }) {
    const response = await api
      .post('/users', { firstName, lastName, username, email, password })
      .catch(error => console.log(error.response.data))

    setToken(response.data.token)

    sessionStorage.setItem('@tindev:token', response.data.token)
  }

  function signOut() {
    sessionStorage.removeItem('@tindev:token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ authenticated: !!token, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}