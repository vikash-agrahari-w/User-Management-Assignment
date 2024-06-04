import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as express from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/exceptionFilter';
import { LoggerMiddleware } from './middlewares/logging.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CONSTANT, Swagger } from './common/constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks(); 

  app.use(
    express.json({
      verify: (req: any, res, buf) => {
        req.rawBody = buf;
      },
    }),
  );

  // global validation pipe for automatic input validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableCors();

  app.use(new LoggerMiddleware().use);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const configService = app.get(ConfigService);

  const nestPort: number = configService.get<number>('PORT') || 8001;

  const config = new DocumentBuilder()
    .setTitle(Swagger.Title)
    .setDescription(Swagger.Description)
    .setVersion(Swagger.Version)
    .addApiKey(
      {
        type: 'apiKey',
        name: Swagger.AddApiKey.Name,
        in: Swagger.AddApiKey.In,
      },
      Swagger.AuthType,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(Swagger.Path, app, document);

  // Start the NestJS application
  await app.listen(nestPort);
  console.info(`Nest server listening on Port: ${nestPort}`);
  console.info(`Swagger UI available at: ${CONSTANT.SWAGGER_PATH(nestPort)}`);
}

bootstrap();
