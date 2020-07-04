import React, { useEffect, useState, useContext } from 'react'
import io from 'socket.io-client'
import { isMobile } from 'react-device-detect'
import {
  Container,
  Row,
  Col
} from 'react-bootstrap'

import './ChatWeb.css'
import './ChatMobile.css'

import AuthContext from '../../contexts/AuthContext'

import logo from '../../assets/logo.svg'
import logoutIcon from '../../assets/log-out.svg'

import Profile from '../../components/web/Profile'
import Contacts from '../../components/web/Contacts'
import Messages from './components/Messages'
import Contact from './components/Contact'
import SubmitArea from './components/SubmitArea'

import api from '../../services/api'

export default function Room({ history, match }) {
  const [toggleReload, setToggleReload] = useState(false)
  const [id, setId] = useState(null)

  const { signOut } = useContext(AuthContext)

  useEffect(() => {
    async function loadContent() {
      const response = await api.get(`/user`, {
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

    socket.on('message', () => {
      setToggleReload(!toggleReload)
    })
  }, [id, toggleReload])

  if (isMobile) {
    return (
      <div className="room-container">
        <div className="chat-box">
          <img src={logo} alt="Tindev" />
          <div className="message-list">
            <div
              className="message"
            >
              <span className="my-msg">Oi!!</span>
            </div>
            {/* {
              messages.length
                ? messages.map(element => (
                  <div
                    key={element.id}
                    className="message"
                  >
                    <span className={
                      element.user_id === myId
                        ? 'my-msg'
                        : 'other-msg'}
                    >
                      {element.data}
                    </span>
                  </div>
                ))
                : ''
            } */}
          </div>
          <form>
            <input
              placeholder="Digite uma mensagem"
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="chat">
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
                <Contacts history={history} toggleReload={toggleReload} />
              </Col>
              <Col className="chat-box">
                <Contact match={match} />
                <Messages toggleReload={toggleReload} match={match} />
                <SubmitArea match={match} />
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </div>
  )
}
