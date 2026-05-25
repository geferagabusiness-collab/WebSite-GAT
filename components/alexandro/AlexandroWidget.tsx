'use client'

import { ALEXANDRO_OPEN_EVENT } from '@/lib/alexandro'
import {
  askAlexandro,
  formatBotReply,
  stripHtml,
  type AlexandroHistoryItem,
} from '@/lib/alexandro-chat'
import { getResponsiveCount } from '@/lib/responsive'
import { useState, useEffect, useRef } from 'react'

function timestamp() {
  return new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
}

const FALLBACK_REPLY =
  'No pude conectar con mi núcleo de IA en este momento. Revisa que el backend esté activo o usa Contactar para hablar con el equipo.'

interface Message {
  id: number
  text: string
  who: 'bot' | 'user'
  time: string
}

export function AlexandroWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hola, soy <b>Alexandro</b>. Soy el gerente operativo IA de Grupo AXM Technology. ¿En qué puedo ayudarte hoy?',
      who: 'bot',
      time: timestamp(),
    },
  ])
  const [inputVal, setInputVal] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const nextId = useRef(2)

  // Spawnear partículas al montar
  useEffect(() => {
    spawnParticles(getResponsiveCount(18, 12, 8))
  }, [])

  // Scroll al último mensaje
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, isTyping])

  function spawnParticles(count: number) {
    const container = document.getElementById('axmParticles')
    if (!container) return
    container.innerHTML = ''
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span')
      p.className = 'axm-particle' + (Math.random() > 0.65 ? ' gold' : '')
      const left = 6 + Math.random() * 88
      const bottom = Math.random() * 60
      const dx = (Math.random() - 0.5) * 60
      const dur = 5 + Math.random() * 5
      const delay = -Math.random() * 6
      p.style.left = left + '%'
      p.style.bottom = bottom + '%'
      p.style.setProperty('--dx', dx + 'px')
      p.style.setProperty('--dur', dur + 's')
      p.style.animationDelay = delay + 's'
      container.appendChild(p)
    }
  }

  function open() {
    setIsOpen(true)
    const stage = document.getElementById('axmStage')
    const avatar = document.getElementById('axmAvatar')
    if (stage) stage.classList.add('open')
    if (avatar) {
      avatar.classList.add('materializing')
      setTimeout(() => avatar.classList.remove('materializing'), 700)
    }
    setTimeout(() => inputRef.current?.focus(), 900)
  }

  function close() {
    setIsOpen(false)
    const stage = document.getElementById('axmStage')
    if (stage) stage.classList.remove('open')
  }

  function toHistory(msgs: Message[]): AlexandroHistoryItem[] {
    return msgs.map((m) => ({
      role: m.who === 'user' ? 'user' : 'model',
      content: stripHtml(m.text),
    }))
  }

  async function replyToUser(userText: string, historyBefore: Message[]) {
    setIsTyping(true)
    try {
      const reply = await askAlexandro(userText, toHistory(historyBefore))
      const botMsg: Message = {
        id: nextId.current++,
        text: formatBotReply(reply),
        who: 'bot',
        time: timestamp(),
      }
      setMessages((prev) => [...prev, botMsg])
    } catch {
      const botMsg: Message = {
        id: nextId.current++,
        text: formatBotReply(FALLBACK_REPLY),
        who: 'bot',
        time: timestamp(),
      }
      setMessages((prev) => [...prev, botMsg])
    } finally {
      setIsTyping(false)
    }
  }

  function sendMessage() {
    const v = inputVal.trim()
    if (!v || isTyping) return
    const userMsg: Message = { id: nextId.current++, text: v, who: 'user', time: timestamp() }
    setMessages((prev) => [...prev, userMsg])
    setInputVal('')
    void replyToUser(v, messages)
  }

  function handleChip(text: string) {
    const v = text.trim()
    if (!v || isTyping) return
    const userMsg: Message = { id: nextId.current++, text: v, who: 'user', time: timestamp() }
    setMessages((prev) => [...prev, userMsg])
    setInputVal('')
    void replyToUser(v, messages)
  }

  // Abrir desde otras páginas (p. ej. /alexandro)
  useEffect(() => {
    function onOpenRequest() {
      open()
    }
    window.addEventListener(ALEXANDRO_OPEN_EVENT, onOpenRequest)
    return () => window.removeEventListener(ALEXANDRO_OPEN_EVENT, onOpenRequest)
  }, [])

  // Cerrar con Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen])

  return (
    <>
      {/* FAB Button */}
      {!isOpen && (
        <button
          className="axm-fab"
          onClick={open}
          aria-label="Hablar con Alexandro"
        >
          <div className="axm-fab-rotate" />
          <div className="axm-fab-inner">
            <div className="axm-fab-avatar" />
          </div>
          <span className="axm-fab-ring-pulse" />
          <span className="axm-fab-ring-pulse delay" />
          <span className="axm-fab-tooltip">Hablar con Alexandro</span>
        </button>
      )}

      {/* Hologram Stage */}
      <div
        id="axmStage"
        className="axm-stage"
        role="dialog"
        aria-modal="true"
        aria-label="Conversación con Alexandro"
      >
        {/* Backdrop — click para cerrar */}
        <div className="axm-backdrop" id="axmBackdrop" onClick={close} />

        {/* HUD readout */}
        <div className="axm-hud">
          <div>// HOLOGRAM PROJECTION ACTIVE</div>
          <div>// NODE_ID <b>GAT-AX-001</b></div>
          <div>// LINK <b>SECURE · 256bit</b></div>
        </div>

        {/* Avatar */}
        <div className="axm-avatar-wrap" id="axmAvatarWrap">
          <div className="axm-floor" />
          <div className="axm-particles" id="axmParticles" />
          <div className="axm-avatar" id="axmAvatar">
            <div className="axm-scanlines" id="axmScan" />
            <div className="axm-core" />
          </div>
        </div>

        {/* Chat Panel */}
        <aside className="axm-panel" id="axmPanel">
          <header className="axm-panel-head">
            <div className="axm-head-avatar" />
            <div className="axm-head-info">
              <b>Alexandro</b>
              <small><em>● En línea</em> · IA · GAT</small>
            </div>
            <button className="axm-close" onClick={close} aria-label="Cerrar">×</button>
          </header>

          <div className="axm-messages" ref={messagesRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`axm-msg ${msg.who}`}
                dangerouslySetInnerHTML={{
                  __html: msg.text + `<span class="axm-msg-time">${msg.time}</span>`,
                }}
              />
            ))}
            {isTyping && (
              <div className="axm-typing">
                <span /><span /><span />
              </div>
            )}
          </div>

          <div className="axm-chips">
            {['Quiero una demo', 'Integraciones', 'Hablar con humano'].map((chip) => (
              <button key={chip} className="axm-chip" onClick={() => handleChip(chip)}>
                {chip}
              </button>
            ))}
          </div>

          <div className="axm-input-row">
            <input
              ref={inputRef}
              type="text"
              placeholder="Escribe tu consulta..."
              autoComplete="off"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
            />
            <button className="axm-send-btn" onClick={sendMessage} aria-label="Enviar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M22 2 11 13" />
                <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
              </svg>
            </button>
          </div>
        </aside>
      </div>
    </>
  )
}
