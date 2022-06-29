import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  // swagger setup
  const config = new DocumentBuilder()
    .setTitle('Fish Identification Chart API')
    .setDescription(
      'Purchase critter lists by region and start logging your spots',
    )
    .setVersion('1.0')
    //.addTag('FIC API')
    .addBearerAuth(
      { in: 'header', type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidocs', app, document);

  const port = 3357;
  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
