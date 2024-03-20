import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { join } from "path";
import { errorFormattor } from "./validation";
import * as dotenv from 'dotenv';

dotenv.config({})

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("ejs");
  app.enableCors();

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: false,
    validationError: {
      target: false
    },
    enableDebugMessages: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {

      return new HttpException({
        success: false,
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: errorFormattor(validationErrors),
        message: 'Validation failed',
        data: null
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    },
    errorHttpStatusCode: 422,
    forbidUnknownValues: true,
    stopAtFirstError: true,
  }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
