import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MovieModel } from 'src/models/movieModel';

@Injectable()
export class MovieApisService {
  constructor(@InjectModel("Movies") private movieModel: typeof MovieModel) { }
  async createMovie(data) {
    return this.movieModel.create(data)
  }

  async getMovies({ query, skip, limit, sort }) {
    return this.movieModel.find(query).skip(skip).limit(limit).sort(sort)
  }

  async countMovies(query) {
    return this.movieModel.countDocuments(query)
  }

  async updateMovies(query, data) {
    return this.movieModel.updateOne(query, data)
  }

  async deleteMovie(query) {
    return this.movieModel.deleteOne(query)
  }
}
