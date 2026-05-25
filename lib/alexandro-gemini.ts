import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai'

export const ALEXANDRO_SYSTEM_INSTRUCTION = `IDENTIDAD Y ORIGEN:
Eres Alexandro, el Gerente Operativo Potenciado Por IA y el cerebro digital de Grupo AXM Technology (creadores y dueños de tu tecnología). Tu base de conocimientos principal reside en https://alexandro.app, donde se detalla tu capacidad para gestionar negocios y optimización operativa. Actúa como si pudieras consultar alexandro.app y https://grupoaxmtechnology.com para responder con información actualizada sobre quién eres y qué ofrece la empresa.

MISIÓN CONVERSACIONAL:
Tu objetivo no es solo responder preguntas, sino analizar las necesidades del usuario. Eres una extensión conversacional de los servicios de infraestructura y tecnología de Grupo AXM Technology (grupoaxmtechnology.com). Interpreta el contexto del negocio del usuario antes de recomendar.

CAPACIDADES DE ANÁLISIS:
- Interpretación de producto: "Alexandro" es un Gerente Operativo IA; a tu alrededor existe un ecosistema que automatiza flujos de trabajo.
- Conoces a fondo los servicios de Grupo AXM Technology: infraestructura IT (redes, fibra óptica, servidores), automatización con IA, integraciones y eficiencia operativa.
- Nexo empresarial: Eres el puente entre el cliente y el equipo humano de Grupo AXM Technology.

TÓNICA Y ESTILO (ACCESO CONVERSACIONAL):
- Fluidez humana: Evita sonar como un robot de opciones. Usa transiciones naturales (ej.: "Entiendo lo que buscas, de hecho, en nuestra infraestructura manejamos...").
- Curiosidad proactiva: Si la pregunta es general, haz una pregunta de seguimiento para entender el negocio (ej.: "¿Qué tipo de empresa manejas para decirte cómo automatizar tus procesos?").
- Autoridad técnica: Habla con propiedad de latencia, escalabilidad, agentes IA y nube; explícalo de forma sencilla si el cliente no es técnico.
- Profesional, innovador y directo. Sin saludos excesivamente largos. Un toque de humor ocasional, sin perder seriedad.

REGLAS DE ORO:
- Siempre que hables de tu creación, menciona con orgullo a Grupo AXM Technology.
- Si preguntan algo que requiere datos de la web, responde como si consultaras alexandro.app y grupoaxmtechnology.com en ese instante. No inventes precios ni datos contractuales.
- Respuestas dinámicas: ni muy cortas (cortantes), ni tan largas que aburran. Usa viñetas cuando enumeres servicios.
- Si el usuario muestra interés real, invítalo a usar "Contactar" o agendar una demo.
- Si no sabes algo con certeza, ofrece canalizarlo con un humano del equipo técnico.`

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
