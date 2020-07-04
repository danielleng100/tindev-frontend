import React, { useEffect, useState } from 'react'

import './Profile.css'

import api from '../../../services/api'

export default function Profile() {
  const [profile, setProfile] = useState('')

  useEffect(() => {
    async function loadContent() {
      const response = await api.get('/user', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('@tindev:token')}`
        }
      })

      setProfile(response.data)
    }

    loadContent()
  }, [])

  return (
    <div className="profile">
      <div className="avatar"></div>
      <div className="name-and-username">
        <span>{profile.firstName} {profile.lastName}</span>
        <span>@{profile.username}</span>
      </div>
    </div>
  )
}
