export type AlexandroChatRole = 'user' | 'model'

export interface AlexandroHistoryItem {
  role: AlexandroChatRole
  content: string
}

// Producción (Hostinger): mismo dominio → /api/alexandro/chat
// Local con Nest opcional: NEXT_PUBLIC_ALEXANDRO_API_URL=http://localhost:3001/api
const API_BASE =
  process.env.NEXT_PUBLIC_ALEXANDRO_API_URL?.replace(/\/$/, '') ?? '/api'

export async function askAlexandro(
  message: string,
  history: AlexandroHistoryItem[],
): Promise<string> {
  const res = await fetch(`${API_BASE}/alexandro/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const msg =
      typeof err?.message === 'string'
        ? err.message
        : 'No pude conectar con Alexandro. Verifica que el backend esté activo.'
    throw new Error(Array.isArray(msg) ? msg.join(' ') : msg)
  }

  const data = (await res.json()) as { reply?: string }
  return data.reply?.trim() || 'Sin respuesta del servidor.'
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

export function formatBotReply(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')
}
