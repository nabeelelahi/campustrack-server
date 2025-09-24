import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import mongooseConnect from 'database/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Campus Track API')
    .setDescription('This is the api documentation of Campus Track')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  app.enableCors({
    origin: '*',
    exposedHeaders: [
      'Access-Token',
      'access-token',
      'Authorization',
      'authorization',
    ],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  mongooseConnect();
  await app.listen(process.env.PORT || 3000, async () =>
    console.log(`Server is running on ${await app.getUrl()}`),
  );
}
bootstrap();
