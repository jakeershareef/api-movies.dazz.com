import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from "@nestjs/mongoose";
import { join } from "path";
import * as dotenv from 'dotenv';

dotenv.config({})
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import configuration from './config/configuration';
import { AuthenticationService } from './authentication/authentication.service';
import { userSchema } from './models/userModel'
import { MovieApisModule } from './movie-apis/movie-apis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_URL + "/movies",
      {}
    ),
    AuthenticationModule,
    MongooseModule.forFeature([
      { name: "Users", schema: userSchema }
    ]),
    MovieApisModule],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    AuthenticationService
  ],
})
export class AppModule { }
