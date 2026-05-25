# ALEXANDRO HOLOGRAM — REACT COMPONENTS (basado en Claude Design)
# Reemplazar TODOS los archivos en components/alexandro/

---

## INSTRUCCIÓN PARA CURSOR

Reemplaza completamente estos archivos con el código de este documento:
- `components/alexandro/AlexandroButton.tsx`
- `components/alexandro/AlexandroModal.tsx`
- `components/alexandro/AlexandroPanel.tsx`
- `components/alexandro/HologramEffects.tsx`
- `components/alexandro/AlexandroAvatar.tsx`
- `components/alexandro/AlexandroWidget.tsx`

Agrega estos estilos al final de `app/globals.css` (sección marcada al final de este doc).

La imagen `public/alexandro/alexandro-fullbody.png` debe tener fondo transparente.
La imagen `public/alexandro/alexandro-icon.png` es el icono circular.

---

## 1. app/globals.css — AGREGAR AL FINAL

```css
/* ============ ALEXANDRO HOLOGRAM SYSTEM ============ */

:root {
  --axm-bg-0: #050912;
  --axm-bg-1: #0a1322;
  --axm-ink: #e9f2ff;
  --axm-ink-dim: #8fa1c2;
  --axm-blue: #2f7af7;
  --axm-cyan: #5cc4ff;
  --axm-cyan-soft: #7ad7ff;
  --axm-gold: #f0b15a;
  --axm-line: rgba(120, 170, 230, 0.14);
  --axm-glass: rgba(14, 28, 52, 0.55);
  --axm-glass-strong: rgba(10, 22, 44, 0.88);
  --glow-intensity: 1;
  --avatar-scale: 1;
}

/* FAB button */
.axm-fab-rotate {
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 0%, #5cc4ff 25%, transparent 50%, #f0b15a 75%, transparent 100%);
  animation: axmSpin 6s linear infinite;
  -webkit-mask: radial-gradient(circle, transparent 65%, black 66%);
  mask: radial-gradient(circle, transparent 65%, black 66%);
  pointer-events: none;
}
@keyframes axmSpin { to { transform: rotate(360deg); } }

.axm-fab-ring-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid #5cc4ff;
  opacity: 0;
  animation: axmPulseRing 2.4s infinite;
  pointer-events: none;
}
.axm-fab-ring-pulse.delay { animation-delay: 1.2s; }
@keyframes axmPulseRing {
  0%   { opacity: .55; transform: scale(.95); }
  80%  { opacity: 0;   transform: scale(1.45); }
  100% { opacity: 0;   transform: scale(1.45); }
}

/* Avatar stage */
.axm-stage {
  position: fixed;
  inset: 0;
  z-index: 70;
  pointer-events: none;
  opacity: 0;
  transition: opacity .5s ease;
}
.axm-stage.open {
  opacity: 1;
  pointer-events: auto;
}

/* Backdrop */
.axm-backdrop {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 80% at 75% 100%, rgba(8,18,36,0.55) 0%, rgba(2,6,14,0.92) 70%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Floor halo */
.axm-floor {
  position: absolute;
  bottom: -120px;
  right: 6%;
  width: 720px;
  height: 240px;
  background: radial-gradient(ellipse 50% 50% at 50% 50%, rgba(92,196,255,0.6) 0%, rgba(47,122,247,0.25) 30%, transparent 70%);
  filter: blur(30px);
  opacity: 0;
  transform: scale(0.4);
  transition: opacity 1.2s ease, transform 1.4s cubic-bezier(.16,1,.3,1);
  pointer-events: none;
}
.axm-stage.open .axm-floor {
  opacity: .85;
  transform: scale(1);
  animation: axmFloorPulse 4s ease-in-out infinite 1.5s;
}
@keyframes axmFloorPulse {
  0%, 100% { opacity: .7; transform: scale(1); }
  50%       { opacity: 1; transform: scale(1.08); }
}

/* Avatar wrap */
.axm-avatar-wrap {
  position: absolute;
  bottom: 0;
  right: max(5%, calc(50vw - 640px));
  width: clamp(280px, 38vw, 460px);
  height: 100vh;
  pointer-events: none;
}

/* Avatar */
.axm-avatar {
  position: absolute;
  left: 0; right: 0; bottom: -8%;
  aspect-ratio: 1024 / 1536;
  background: url('/alexandro/alexandro-fullbody.png') center top / 100% 100% no-repeat;
  filter:
    brightness(1.08) contrast(1.06) saturate(1.12)
    drop-shadow(0 0 18px rgba(92,196,255,0.55))
    drop-shadow(0 0 60px rgba(47,122,247,0.35))
    drop-shadow(0 0 110px rgba(92,196,255,0.22));
  transform: translate(0, 100%) scale(.85);
  opacity: 0;
  transition: transform 1.2s cubic-bezier(.16,1,.3,1), opacity 1s ease, filter 1.1s ease;
}
.axm-stage.open .axm-avatar {
  transform: translate(0, 0) scale(var(--avatar-scale, 1));
  opacity: 1;
  animation: axmBreathe 5s ease-in-out infinite 1.3s;
}
@keyframes axmBreathe {
  0%, 100% { transform: translate(0, 0) scale(var(--avatar-scale, 1)); }
  50%       { transform: translate(0, -10px) scale(calc(var(--avatar-scale, 1) * 1.005)); }
}
.axm-avatar.materializing {
  filter: brightness(1.9) blur(14px) saturate(1.6) drop-shadow(0 0 40px rgba(122,215,255,0.9));
}

/* Scan lines — enmascaradas al cuerpo del avatar */
.axm-scanlines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(0deg,
    transparent 0,
    transparent 3px,
    rgba(122,215,255,0.12) 3px,
    rgba(122,215,255,0.12) 4px);
  -webkit-mask: url('/alexandro/alexandro-fullbody.png') center top / 100% 100% no-repeat;
  mask: url('/alexandro/alexandro-fullbody.png') center top / 100% 100% no-repeat;
  mix-blend-mode: screen;
  opacity: 0;
  transition: opacity .8s ease;
}
.axm-stage.open .axm-scanlines { opacity: 1; }
.axm-scanlines::after {
  content: '';
  position: absolute;
  left: 0; right: 0;
  height: 30%;
  background: linear-gradient(180deg, transparent, rgba(122,215,255,0.35) 50%, transparent);
  animation: axmScanSweep 4.5s linear infinite 1.5s;
}
@keyframes axmScanSweep {
  0%   { top: -30%; }
  100% { top: 100%; }
}

/* Energy core */
.axm-core {
  position: absolute;
  right: 0; left: 0;
  bottom: 38%;
  margin: 0 auto;
  width: 30%;
  aspect-ratio: 1;
  background: radial-gradient(circle, rgba(255,220,150,0.9) 0%, rgba(240,177,90,0.5) 20%, rgba(92,196,255,0.25) 40%, transparent 70%);
  mix-blend-mode: screen;
  opacity: 0;
  transition: opacity .8s ease 1s;
  animation: none;
}
.axm-stage.open .axm-core {
  opacity: 1;
  animation: axmCorePulse 3s ease-in-out infinite 1.5s;
}
@keyframes axmCorePulse {
  0%, 100% { transform: scale(1);   opacity: .85; }
  50%       { transform: scale(1.3); opacity: 1; }
}

/* Particles */
.axm-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.axm-particle {
  position: absolute;
  width: 3px; height: 3px;
  border-radius: 50%;
  background: #5cc4ff;
  box-shadow: 0 0 6px #5cc4ff;
  opacity: 0;
  animation: axmParticleFloat var(--dur, 6s) ease-out var(--delay, 0s) infinite;
}
.axm-particle.gold {
  background: #f0b15a;
  box-shadow: 0 0 6px #f0b15a;
}
@keyframes axmParticleFloat {
  0%   { opacity: 0;   transform: translateY(0) translateX(0); }
  15%  { opacity: .9; }
  85%  { opacity: .6; }
  100% { opacity: 0;   transform: translateY(-220px) translateX(var(--dx, 0px)); }
}

/* HUD readout */
.axm-hud {
  position: absolute;
  bottom: 24px;
  left: 24px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--axm-ink-dim);
  line-height: 1.9;
  opacity: 0;
  transition: opacity 1s ease 1.2s;
  pointer-events: none;
}
.axm-stage.open .axm-hud { opacity: .55; }
.axm-hud b { color: #5cc4ff; font-weight: 500; }

/* Panel */
.axm-panel {
  position: absolute;
  left: max(24px, calc(50vw - 640px + 24px));
  bottom: 32px;
  width: 360px;
  max-height: 70vh;
  background: var(--axm-glass-strong);
  border: 1px solid var(--axm-line);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(47,122,247,0.15);
  transform: translateY(30px);
  opacity: 0;
  transition: transform .8s cubic-bezier(.16,1,.3,1) .3s, opacity .6s ease .3s;
}
.axm-stage.open .axm-panel {
  transform: translateY(0);
  opacity: 1;
}

/* Panel header */
.axm-panel-head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid var(--axm-line);
  flex-shrink: 0;
}
.axm-head-avatar {
  width: 42px; height: 42px;
  border-radius: 50%;
  background: url('/alexandro/alexandro-icon.png') center / cover;
  box-shadow: 0 0 16px rgba(92,196,255,0.5);
  flex-shrink: 0;
}
.axm-head-info { flex: 1; }
.axm-head-info b {
  display: block;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--axm-ink);
}
.axm-head-info small {
  font-size: 11px;
  color: var(--axm-ink-dim);
  letter-spacing: 0.04em;
}
.axm-head-info em {
  font-style: normal;
  color: #4ade80;
}
.axm-close {
  background: none;
  border: none;
  color: var(--axm-ink-dim);
  font-size: 22px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: color .2s, background .2s;
  line-height: 1;
}
.axm-close:hover { color: var(--axm-ink); background: rgba(255,255,255,0.06); }

/* Messages */
.axm-messages {
  flex: 1;
  overflow-y: auto;
  padding: 18px 18px 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scroll-behavior: smooth;
  min-height: 200px;
}
.axm-messages::-webkit-scrollbar { width: 6px; }
.axm-messages::-webkit-scrollbar-thumb { background: rgba(120,170,230,0.18); border-radius: 3px; }

.axm-msg {
  max-width: 86%;
  padding: 12px 14px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
  animation: axmMsgIn .45s cubic-bezier(.16,1,.3,1);
}
@keyframes axmMsgIn { from { opacity: 0; transform: translateY(8px); } }
.axm-msg.bot {
  align-self: flex-start;
  background: rgba(120,170,230,0.08);
  border: 1px solid rgba(120,170,230,0.14);
  border-bottom-left-radius: 6px;
  color: var(--axm-ink);
}
.axm-msg.user {
  align-self: flex-end;
  background: linear-gradient(135deg, rgba(47,122,247,0.4), rgba(92,196,255,0.32));
  border: 1px solid rgba(92,196,255,0.4);
  border-bottom-right-radius: 6px;
  color: white;
}
.axm-msg-time {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.12em;
  opacity: .55;
  margin-top: 4px;
}
.axm-typing {
  align-self: flex-start;
  background: rgba(120,170,230,0.08);
  border: 1px solid rgba(120,170,230,0.14);
  padding: 12px 14px;
  border-radius: 16px;
  border-bottom-left-radius: 6px;
  display: flex;
  gap: 4px;
}
.axm-typing span {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #5cc4ff;
  opacity: .5;
  animation: axmTyping 1.2s infinite;
}
.axm-typing span:nth-child(2) { animation-delay: .15s; }
.axm-typing span:nth-child(3) { animation-delay: .3s; }
@keyframes axmTyping {
  0%, 60%, 100% { transform: translateY(0);    opacity: .4; }
  30%            { transform: translateY(-4px); opacity: 1; }
}

/* Chips */
.axm-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 0 18px 8px;
}
.axm-chip {
  font-size: 11px;
  font-weight: 500;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(92,196,255,0.06);
  border: 1px solid rgba(92,196,255,0.22);
  color: #7ad7ff;
  cursor: pointer;
  transition: all .2s;
  white-space: nowrap;
}
.axm-chip:hover { background: rgba(92,196,255,0.14); color: white; }

/* Input */
.axm-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px 14px;
  border-top: 1px solid rgba(120,170,230,0.12);
  background: linear-gradient(0deg, rgba(0,0,0,0.2), transparent);
  flex-shrink: 0;
}
.axm-input-row input {
  flex: 1;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(120,170,230,0.18);
  border-radius: 12px;
  padding: 11px 14px;
  color: var(--axm-ink);
  font-family: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color .2s, box-shadow .2s;
}
.axm-input-row input::placeholder { color: var(--axm-ink-dim); }
.axm-input-row input:focus {
  border-color: #5cc4ff;
  box-shadow: 0 0 0 3px rgba(92,196,255,0.15);
}
.axm-send-btn {
  width: 42px; height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, #2f7af7, #5cc4ff);
  border: none;
  color: white;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: transform .15s, box-shadow .2s;
  box-shadow: 0 4px 16px rgba(47,122,247,0.45);
  flex-shrink: 0;
}
.axm-send-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 22px rgba(47,122,247,0.55); }
.axm-send-btn:active { transform: scale(.96); }

/* Mobile */
@media (max-width: 900px) {
  .axm-panel {
    left: 16px; right: 16px;
    bottom: 16px;
    width: auto;
    max-height: 56vh;
  }
  .axm-avatar-wrap {
    right: 0; left: 0;
    width: 100%;
    height: 55vh;
    top: 0; bottom: auto;
  }
  .axm-hud { display: none; }
}
```

---

## 2. components/alexandro/AlexandroWidget.tsx

```tsx
'use client'

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
```

---

## 3. app/layout.tsx — MODIFICAR

Reemplazar `<AlexandroWidget />` (o el componente que tengas actualmente de Alexandro) con:

```tsx
import { AlexandroWidget } from '@/components/alexandro/AlexandroWidget'

// Dentro del <body>:
<AlexandroWidget />
```

Eliminar imports de `AlexandroButton` y `AlexandroModal` si existen por separado — ahora todo está en `AlexandroWidget`.

---

## NOTAS IMPORTANTES

1. La imagen `alexandro-fullbody.png` DEBE tener fondo transparente para que el glow de `drop-shadow` siga el contorno real del cuerpo. Si el archivo actual tiene fondo, reemplazarlo con `Alexandro Holgram.png` (la versión transparente que generó Claude Design).

2. Para copiar la imagen transparente:
```bash
cp "/ruta/donde/guardaste/Alexandro Holgram.png" "/media/nas_local/Proyectos Grupo AXM Technology/Website GAT/public/alexandro/alexandro-fullbody.png"
```

3. Los otros archivos (`HologramEffects.tsx`, `AlexandroAvatar.tsx`, `AlexandroModal.tsx`, `AlexandroButton.tsx`, `AlexandroPanel.tsx`) pueden eliminarse — `AlexandroWidget.tsx` los reemplaza todos en un solo componente cliente.
