import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

//console.log(process.env.MY_VARIABLE);

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  // swagger setup
  const config = new DocumentBuilder()
    .setTitle('Fish Identification Chart API')
    .setDescription(
      'Purchase critter lists by rgion and start logging your spots',
    )
    .setVersion('1.0')
    .addTag('critter')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidocs', app, document);

  const port = 3357;
  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
