import { Test, TestingModule } from '@nestjs/testing';
import { MovieApisService } from './movie-apis.service';

describe('MovieApisService', () => {
  let service: MovieApisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieApisService],
    }).compile();

    service = module.get<MovieApisService>(MovieApisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
