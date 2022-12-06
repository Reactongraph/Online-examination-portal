import { Test, TestingModule } from '@nestjs/testing';
import { QuestionOptionsController } from './question_options.controller';

describe('QuestionOptionsController', () => {
  let controller: QuestionOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionOptionsController],
    }).compile();

    controller = module.get<QuestionOptionsController>(QuestionOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
