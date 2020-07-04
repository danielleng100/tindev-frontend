import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'

import './Register.css'

import AuthContext from '../../contexts/AuthContext'

import api from '../../services/api'

import logo from "../../assets/logo.svg"

export default function Register({ history }) {
  const { signUp } = useContext(AuthContext)
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = data => signUp(data)

  const validateUsername = async value => {
    const response = await api.get(`/validate/username/${value}`)
      .catch(err => console.log(err.response))

    return response.data.success
  }

  const validateEmail = async value => {
    const response = await api.get(`/validate/email/${value}`)
      .catch(err => console.log(err.response))

    return response.data.success
  }

  return (
    <div className="register-container">
      <img src={logo} alt="Tindev" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">
          Primeiro nome *
          <input
            id="firstName"
            name="firstName"
            ref={register({ maxLength: 12, required: true, pattern: /^[A-Za-z]+$/i })}
          />
        </label>
        {
          (errors.firstName && errors.firstName.type === "required" && <p>Preencha o campo acima</p>)
          ||
          (errors.firstName && errors.firstName.type === "pattern" && <p>Preencha um nome válido no campo acima</p>)
          ||
          (errors.firstName && errors.firstName.type === "maxLength" && <p>O campo acima precisa ter no máximo 12 caracteres</p>)
        }
        <label htmlFor="lastName">
          Último nome *
          <input
            id="lastName"
            name="lastName"
            ref={register({ maxLength: 12, required: true, pattern: /^[A-Za-z]+$/i })}
          />
        </label>
        {
          (errors.lastName && errors.lastName.type === "required" && <p>Preencha o campo acima</p>)
          ||
          (errors.lastName && errors.lastName.type === "pattern" && <p>Preencha o campo acima com um nome válido</p>)
          ||
          (errors.lastName && errors.lastName.type === "maxLength" && <p>O campo acima precisa ter no máximo 12 caracteres</p>)
        }
        <label htmlFor="username">
          Nome de usuário *
          <input
            id="username"
            name="username"
            ref={register({ required: true, minLength: 6, maxLength: 18, validate: validateUsername })}
          />
        </label>
        {
          (errors.username && errors.username.type === "required" && <p>Preencha o campo acima</p>)
          ||
          (errors.username && (errors.username.type === "minLength" || errors.username.type === "maxLength") && <p>O campo acima precisa ter no mínimo 6 e no máximo 18 caracteres</p>)
          ||
          (errors.username && errors.username.type === "validate" && <p>O campo acima foi preenchido com um usuário que já existe</p>)
        }
        <label htmlFor="email">
          Email *
          <input
            type="email"
            id="email"
            name="email"
            ref={register({ validate: validateEmail, required: true, maxLength: 40, pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i })}
          />
        </label>
        {
          (errors.email && errors.email.type === "required" && <p>Preencha o campo acima</p>)
          ||
          (errors.email && errors.email.type === "pattern" && <p>Preencha o campo acima com um email válido</p>)
          ||
          (errors.email && errors.email.type === "validate" && <p>O campo acima foi preenchido com um email que já existe</p>)
        }
        <label>
          Senha *
          <input
            type="password"
            id="password"
            name="password"
            ref={register({ required: true, minLength: 8, maxLength: 40, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/i })}
          />
        </label>
        {
          (errors.password && errors.password.type === "required" && <p>Preencha o campo acima</p>)
          ||
          (errors.password && (errors.password.type === "minLength" || errors.username.type === "pattern") && <p>Preencha o campo acima com uma senha válida</p>)
        }
        <button type="submit">Enviar</button>
      </form>
      <button
        onClick={() => history.push('/login')}
        className="login-button"
      >
        Login
      </button>
    </div>
  )
}
