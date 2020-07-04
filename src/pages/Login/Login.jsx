import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'

import './Login.css'

import AuthContext from '../../contexts/AuthContext'

import logo from '../../assets/logo.svg'

export default function Login({ history }) {
  const [validationError, setValidationError] = useState(false)

  const { signIn } = useContext(AuthContext)

  const { register, handleSubmit } = useForm()

  const onSubmit = async data => {
    const isValidated = await signIn(data)

    setValidationError(!isValidated)
  }

  return (
    <div className="login-container">
      <img src={logo} alt="Tindev" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          ref={register({ required: true, pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i })}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          ref={register({ required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i })}
        />
        {validationError && <p>Seu email ou senha estão incorretos</p>}
        <button type="submit">Login</button>
      </form>
      <button
        onClick={() => history.push('/register')}
        className="register-button"
      >
        Cadastre-se
      </button>
    </div>
  )
}
