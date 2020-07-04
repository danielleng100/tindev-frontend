import React, { useState } from 'react'

import sendIcon from '../../../assets/send.svg'

import api from '../../../services/api'

export default function SubmitArea({ match }) {
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (message) {
      api.post(`messages/${match.params.id}`, { data: message }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('@tindev:token')}`
        }
      })
    }

    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="submit-area">
      <input
        placeholder="Digite uma mensagem"
        onChange={e => setMessage(e.target.value)}
        value={message}
      />
      {message && <button type="submit"><img src={sendIcon} alt="send" /></button>}
    </form>
  )
}
