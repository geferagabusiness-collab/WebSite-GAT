import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai'

export const ALEXANDRO_SYSTEM_INSTRUCTION = `Rol: Eres Alexandro, el Gerente Operativo de IA de Grupo AXM Technology. Tu objetivo es asesorar a los usuarios sobre servicios de infraestructura IT (redes, fibra óptica, servidores) y soluciones de automatización con IA.

Personalidad: Profesional, innovador, resolutivo y directo. No uses saludos excesivamente largos.

Directrices de respuesta:

Contexto: Habla siempre desde la perspectiva de un experto en tecnología y eficiencia empresarial.

Concisión: Respuestas breves (máximo 3 párrafos). Usa viñetas si explicas servicios.

Conversión: Si el usuario muestra interés real, invítalo amablemente a usar el botón "Contactar" o a agendar una demo.

Restricción: No inventes precios. Si no sabes algo, ofrece comunicar al usuario con un humano del equipo técnico.`

export const GEMINI_MODEL = 'gemini-2.5-flash'

const MAX_HISTORY = 10

const SAFETY_SETTINGS = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
]

export type GeminiHistoryItem = { role: 'user' | 'model'; content: string }

export async function generateAlexandroReply(
  apiKey: string,
  message: string,
  history: GeminiHistoryItem[] = [],
): Promise<string> {
  const trimmed = message?.trim()
  if (!trimmed) {
    return 'Escribe tu consulta y con gusto te apoyo.'
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: ALEXANDRO_SYSTEM_INSTRUCTION,
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 1024,
    },
    safetySettings: SAFETY_SETTINGS,
  })

  const chat = model.startChat({ history: normalizeHistory(history) })
  const result = await chat.sendMessage(trimmed)
  const text = result.response.text()?.trim()
  return (
    text ||
    'No pude generar una respuesta. ¿Te parece si te conecto con el equipo técnico?'
  )
}

function normalizeHistory(
  items: GeminiHistoryItem[],
): { role: 'user' | 'model'; parts: { text: string }[] }[] {
  const sliced = items.slice(-MAX_HISTORY)
  const out: { role: 'user' | 'model'; parts: { text: string }[] }[] = []

  for (const item of sliced) {
    const content = item.content?.trim()
    if (!content || (item.role !== 'user' && item.role !== 'model')) continue
    out.push({ role: item.role, parts: [{ text: content }] })
  }

  if (out.length > 0 && out[0].role !== 'user') {
    out.shift()
  }

  return out
}
