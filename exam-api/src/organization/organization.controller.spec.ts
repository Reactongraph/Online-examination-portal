import { Test, TestingModule } from '@nestjs/testing';
import { RestApiController } from './organization.controller';
import { RestApiService } from './organization.service';

describe('RestApiController', () => {
  let controller: RestApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestApiController],
      providers: [RestApiService],
    }).compile();

    controller = module.get<RestApiController>(RestApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
