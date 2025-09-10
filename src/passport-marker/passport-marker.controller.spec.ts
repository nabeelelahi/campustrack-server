import { Test, TestingModule } from '@nestjs/testing';
import { PassportMarkerController } from './passport-marker.controller';
import { PassportMarkerService } from './passport-marker.service';

describe('PassportMarkerController', () => {
  let controller: PassportMarkerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassportMarkerController],
      providers: [PassportMarkerService],
    }).compile();

    controller = module.get<PassportMarkerController>(PassportMarkerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
