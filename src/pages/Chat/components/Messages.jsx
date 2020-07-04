import React, { useState, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

import api from '../../../services/api'
import serielizedDate from '../../../services/dateSerielizer'

export default function Messages({ match, toggleReload }) {
  const [id, setId] = useState(null)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    async function loadContent() {
      const messagesResponse = await api.get(`/messages/${match.params.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('@tindev:token')}`
        }
      })

      const idResponse = await api.get('/user', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('@tindev:token')}`
        }
      })


      setMessages(messagesResponse.data)
      setId(idResponse.data.id)
    }

    loadContent()

  }, [match.params.id, toggleReload])

  return (
    <ScrollToBottom className="messages">
      {messages.map(element => (
        <div key={element.id} className={element.user_id === id ? "message my-msg" : "message other-msg"}>
          <div className="avatar"></div>
          <div className="message-data">
            <span className={element.user_id === id ? "my-msg" : "other-msg"}>{element.data}</span>
            <span className={element.user_id === id ? "my-msg" : "other-msg"}>{serielizedDate(element.created_at)}</span>
          </div>
        </div>
      ))}
    </ScrollToBottom>
  )
}
