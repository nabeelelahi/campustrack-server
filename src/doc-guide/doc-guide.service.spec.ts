import { Test, TestingModule } from '@nestjs/testing';
import { DocGuideService } from './doc-guide.service';

describe('DocGuideService', () => {
  let service: DocGuideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocGuideService],
    }).compile();

    service = module.get<DocGuideService>(DocGuideService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
