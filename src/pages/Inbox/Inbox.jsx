import React, { useState, useEffect, useContext } from 'react'
import io from 'socket.io-client'
import { isMobile } from 'react-device-detect'
import {
  Container,
  Row,
  Col
} from 'react-bootstrap'

import './InboxWeb.css'
import './InboxMobile.css'

import AuthContext from '../../contexts/AuthContext'

import logo from '../../assets/logo.svg'
import sendIcon from '../../assets/send.svg'
import logoutIcon from '../../assets/log-out.svg'

import api from '../../services/api'

import Profile from '../../components/web/Profile'
import Contacts from '../../components/web/Contacts'

export default function Chat({ history }) {
  const [id, setId] = useState(null)
  const [toggleReload, setToggleReload] = useState(false)

  const { signOut } = useContext(AuthContext)

  useEffect(() => {
    async function loadContent() {
      const response = await api.get('/user', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('@tindev:token')}`
        }
      })

      setId(response.data.id)
    }

    loadContent()
  }, [])

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL, {
      query: { id }
    })

    socket.on('message', () => setToggleReload(!toggleReload))
  }, [id, toggleReload])

  if (isMobile) {
    return (
      <div className="mobile-container">
        <div className="contact-list">
          <div className="navbar">
            <img src={logo} alt="Tindev" />
          </div>
          <div className="contacts">
            <div
              className="contact"
              onClick={() => history.push('/1')}
            >
              <div className="contact-photo"></div>
              <div className="name-and-msg">
                <span>Name</span>
                <span>Oi, como foi sua semana?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="inbox">
      <nav>
        <img src={logo} alt="Tindev" />
        <img onClick={() => signOut()} src={logoutIcon} alt="logout" />
      </nav>
      <main>
        <section className="main-container">
          <Container fluid>
            <Row noGutters>
              <Col lg="5" md="5" xl="4" xs="5" sm="5" className="contact-list">
                <Profile />
                <Contacts toggleReload={toggleReload} history={history} />
              </Col>
              <Col className="no-chat-box">
                <div className="add-chat">
                  <img src={sendIcon} alt="#" />
                  <p>Selecione uma conversa para enviar mensagens</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </div>
  )
}