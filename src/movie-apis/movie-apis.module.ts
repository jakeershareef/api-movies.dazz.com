import { Module } from '@nestjs/common';
import { MovieApisService } from './movie-apis.service';
import { MovieApisController } from './movie-apis.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from 'src/models/movieModel';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { userSchema } from 'src/models/userModel';
import { PaginationHelper } from 'src/helpers/paginationHelper';
import { FilterHelper } from 'src/helpers/filterHelper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Movies", schema: MovieSchema },
    { name: "Users", schema: userSchema },
    ]),
  ],
  controllers: [MovieApisController],
  providers: [MovieApisService, JwtService, AuthenticationService, FilterHelper, PaginationHelper],
})
export class MovieApisModule { }
