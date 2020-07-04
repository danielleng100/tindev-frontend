import React, { useState, useEffect } from 'react'

import api from '../../../services/api'

export default function Contact({ match }) {
  const [contact, setContact] = useState('')

  useEffect(() => {
    async function loadContent() {
      const response = await api.get(`/contact/${match.params.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('@tindev:token')}`
        }
      }).catch(e => console.log(e.response))

      setContact(response.data)
    }

    loadContent()
  }, [match.params.id])

  return (
    <div className="contact">
      <div className="avatar"></div>
      <span>{contact.firstName} {contact.lastName}</span>
    </div>
  )
}
