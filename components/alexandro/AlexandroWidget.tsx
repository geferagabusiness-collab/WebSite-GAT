'use client'

import { ALEXANDRO_OPEN_EVENT } from '@/lib/alexandro'
import { useState, useEffect, useRef } from 'react'

function timestamp() {
  return new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
}

const REPLIES: Record<string, string> = {
  demo: 'Con gusto. ¿Para qué área te interesa la demo: ventas, operaciones o servicio al cliente?',
  integr: 'Me conecto con CRM, ERP, WhatsApp Business, Teams, Notion y +180 servicios vía API.',
  humano: 'Listo, te canalizo con un ejecutivo. ¿Prefieres que te llamen o un chat con un humano ahora?',
  default: 'Recibido. Estoy procesando tu consulta y te respondo en un momento.',
}

function pickReply(q: string): string {
  const s = q.toLowerCase()
  if (s.includes('demo')) return REPLIES.demo
  if (s.includes('integr')) return REPLIES.integr
  if (s.includes('humano') || s.includes('persona')) return REPLIES.humano
  return REPLIES.default
}

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
    spawnParticles(18)
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

  function sendMessage() {
    const v = inputVal.trim()
    if (!v) return
    const userMsg: Message = { id: nextId.current++, text: v, who: 'user', time: timestamp() }
    setMessages((prev) => [...prev, userMsg])
    setInputVal('')
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const botMsg: Message = { id: nextId.current++, text: pickReply(v), who: 'bot', time: timestamp() }
      setMessages((prev) => [...prev, botMsg])
    }, 900 + Math.random() * 500)
  }

  function handleChip(text: string) {
    setInputVal(text)
    setTimeout(() => {
      const v = text.trim()
      if (!v) return
      const userMsg: Message = { id: nextId.current++, text: v, who: 'user', time: timestamp() }
      setMessages((prev) => [...prev, userMsg])
      setInputVal('')
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const botMsg: Message = { id: nextId.current++, text: pickReply(v), who: 'bot', time: timestamp() }
        setMessages((prev) => [...prev, botMsg])
      }, 900 + Math.random() * 500)
    }, 50)
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
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 60,
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            background: 'transparent',
            padding: 0,
          }}
        >
          <div className="axm-fab-rotate" />
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'var(--axm-bg-1)',
            overflow: 'hidden',
            boxShadow: '0 0 0 1px rgba(120,170,230,0.4), 0 8px 30px rgba(47,122,247,0.4), 0 0 40px rgba(92,196,255,0.35)',
            transition: 'transform .25s ease, box-shadow .25s ease',
          }}>
            <div style={{
              position: 'absolute',
              inset: '-4%',
              backgroundImage: "url('/alexandro/alexandro-icon.png')",
              backgroundPosition: 'center 28%',
              backgroundSize: '130%',
            }} />
          </div>
          <span className="axm-fab-ring-pulse" />
          <span className="axm-fab-ring-pulse delay" />
          {/* Tooltip */}
          <span style={{
            position: 'absolute',
            right: '84px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'var(--axm-glass-strong)',
            border: '1px solid rgba(120,170,230,0.22)',
            backdropFilter: 'blur(12px)',
            color: 'var(--axm-ink)',
            fontSize: '12px',
            fontWeight: 500,
            padding: '9px 14px',
            borderRadius: '10px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            letterSpacing: '0.01em',
          }}>
            Hablar con Alexandro
          </span>
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
