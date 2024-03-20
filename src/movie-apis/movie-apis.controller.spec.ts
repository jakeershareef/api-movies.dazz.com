import { Test, TestingModule } from '@nestjs/testing';
import { MovieApisController } from './movie-apis.controller';
import { MovieApisService } from './movie-apis.service';

describe('MovieApisController', () => {
  let controller: MovieApisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieApisController],
      providers: [MovieApisService],
    }).compile();

    controller = module.get<MovieApisController>(MovieApisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
