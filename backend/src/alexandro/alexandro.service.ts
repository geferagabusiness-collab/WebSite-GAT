import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';
import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ALEXANDRO_SYSTEM_INSTRUCTION,
  GEMINI_MODEL,
} from './alexandro.prompt';
import { ChatHistoryItemDto, ChatRequestDto } from './dto/chat.dto';

const MAX_HISTORY = 10;

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
];

@Injectable()
export class AlexandroService {
  private readonly logger = new Logger(AlexandroService.name);

  constructor(private readonly config: ConfigService) {}

  async chat(dto: ChatRequestDto): Promise<string> {
    const apiKey = this.config.get<string>('GEMINI_API_KEY');
    if (!apiKey?.trim()) {
      throw new ServiceUnavailableException(
        'Alexandro no está configurado. Falta GEMINI_API_KEY en el servidor.',
      );
    }

    const message = dto.message?.trim();
    if (!message) {
      return 'Escribe tu consulta y con gusto te apoyo.';
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: ALEXANDRO_SYSTEM_INSTRUCTION,
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 1024,
      },
      safetySettings: SAFETY_SETTINGS,
    });

    const history = this.normalizeHistory(dto.history ?? []);

    try {
      const chat = model.startChat({ history });
      const result = await chat.sendMessage(message);
      const text = result.response.text()?.trim();
      return (
        text ||
        'No pude generar una respuesta. ¿Te parece si te conecto con el equipo técnico?'
      );
    } catch (err) {
      this.logger.error('Gemini chat error', err);
      throw new ServiceUnavailableException(
        'Alexandro tuvo un problema al responder. Intenta de nuevo o usa Contactar para hablar con el equipo.',
      );
    }
  }

  private normalizeHistory(
    items: ChatHistoryItemDto[],
  ): { role: 'user' | 'model'; parts: { text: string }[] }[] {
    const sliced = items.slice(-MAX_HISTORY);
    const out: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];

    for (const item of sliced) {
      const content = item.content?.trim();
      if (!content || (item.role !== 'user' && item.role !== 'model')) continue;
      out.push({ role: item.role, parts: [{ text: content }] });
    }

    if (out.length > 0 && out[0].role !== 'user') {
      out.shift();
    }

    return out;
  }
}
