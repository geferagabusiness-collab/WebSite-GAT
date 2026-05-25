import { Module } from '@nestjs/common';
import { AlexandroController } from './alexandro.controller';
import { AlexandroService } from './alexandro.service';

@Module({
  controllers: [AlexandroController],
  providers: [AlexandroService],
})
export class AlexandroModule {}
