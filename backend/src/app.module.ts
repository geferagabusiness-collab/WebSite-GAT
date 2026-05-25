import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlexandroModule } from './alexandro/alexandro.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AlexandroModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
