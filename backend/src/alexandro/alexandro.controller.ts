import { Body, Controller, Post } from '@nestjs/common';
import { AlexandroService } from './alexandro.service';
import { ChatRequestDto, ChatResponseDto } from './dto/chat.dto';

@Controller('alexandro')
export class AlexandroController {
  constructor(private readonly alexandro: AlexandroService) {}

  @Post('chat')
  async chat(@Body() body: ChatRequestDto): Promise<ChatResponseDto> {
    const reply = await this.alexandro.chat(body);
    return { reply };
  }
}
