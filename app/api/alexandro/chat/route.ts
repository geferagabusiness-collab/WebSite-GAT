import { generateAlexandroReply, type GeminiHistoryItem } from '@/lib/alexandro-gemini'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

interface ChatBody {
  message?: string
  history?: GeminiHistoryItem[]
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY?.trim()
  if (!apiKey) {
    return NextResponse.json(
      {
        message:
          'Alexandro no está configurado en el servidor. Falta la variable GEMINI_API_KEY.',
      },
      { status: 503 },
    )
  }

  let body: ChatBody
  try {
    body = (await request.json()) as ChatBody
  } catch {
    return NextResponse.json({ message: 'Cuerpo JSON inválido.' }, { status: 400 })
  }

  try {
    const reply = await generateAlexandroReply(
      apiKey,
      body.message ?? '',
      body.history ?? [],
    )
    return NextResponse.json({ reply })
  } catch (err) {
    console.error('[alexandro/chat]', err)
    return NextResponse.json(
      {
        message:
          'Alexandro tuvo un problema al responder. Intenta de nuevo o usa Contactar.',
      },
      { status: 503 },
    )
  }
}
