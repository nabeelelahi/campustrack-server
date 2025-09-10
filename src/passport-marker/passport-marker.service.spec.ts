import { Test, TestingModule } from '@nestjs/testing';
import { PassportMarkerService } from './passport-marker.service';

describe('PassportMarkerService', () => {
  let service: PassportMarkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassportMarkerService],
    }).compile();

    service = module.get<PassportMarkerService>(PassportMarkerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
