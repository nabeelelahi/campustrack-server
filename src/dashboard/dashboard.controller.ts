import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('api/dashboard')
export class DashboardController {
  constructor(protected _service: DashboardService) {}

  @Get()
  async getDashboard() {
    return await this._service.dashboard();
  }
}
