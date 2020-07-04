import React, { useState, useEffect } from 'react'

import './Contacts.css'

import api from '../../../services/api'

export default function Contacts({ history, toggleReload }) {
  const [value, setValue] = useState('')
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState([])

  useEffect(() => {
    async function loadContent() {
      const response = await api.get('/contacts', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('@tindev:token')}`
        }
      }).catch(e => console.log(e.response))
      
      console.log(response.data)
      setContacts(response.data)
    }

    loadContent()
  }, [toggleReload])

  async function handleSearch() {
    let response

    if (value) {
      response = await api.get(`/contacts/${value}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('@tindev:token')}`
        }
      }).catch(e => console.log(e.response))

      setSearch(response.data)
    }
  }

  return (
    <div className="contacts">
      <input placeholder="Encontre um usuário" value={value} onChange={e => {
        setValue(e.target.value)
        handleSearch()
      }} />
      {
        value
          ? <>
            {search.map(element => (
              <div key={element.id} className="contact-search">
                <div className="contact-and-avatar">
                  <div className="avatar"></div>
                  <div className="name-and-username">
                    <span>{element.firstName} {element.lastName}</span>
                    <span>@{element.username}</span>
                  </div>
                </div>
                <button onClick={() => {
                  setValue('')
                  history.push(`/chat/${element.id}`)
                }}>Conversar</button>
              </div>
            ))}
          </>

          : <>
            {contacts.map(contact => (
              <div key={contact.message_id} onClick={() => history.push(`/chat/${contact.user_id}`)} className="contact">
                <div className="avatar"></div>
                <div className="name-and-msg">
                  <span>{contact.firstName} {contact.lastName}</span>
                  <span>
                    {contact.target === 0 && 'Você: '}{contact.message.length <= 30 ? contact.message : contact.message.substring(0, 25) + '...'}
                  </span>
                </div>
              </div>
            ))}
          </>
      }
    </div>
  )
}
