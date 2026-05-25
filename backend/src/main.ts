import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const origins = (process.env.FRONTEND_ORIGINS ?? 'http://localhost:3002')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  app.enableCors({ origin: origins, credentials: true });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
