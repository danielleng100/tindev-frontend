import React from 'react';
import Routes from './routes'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App;