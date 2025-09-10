import { Test, TestingModule } from '@nestjs/testing';
import { DocGuideController } from './doc-guide.controller';
import { DocGuideService } from './doc-guide.service';

describe('DocGuideController', () => {
  let controller: DocGuideController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocGuideController],
      providers: [DocGuideService],
    }).compile();

    controller = module.get<DocGuideController>(DocGuideController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
