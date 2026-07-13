import { Controller, Get, Body } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  async populateDB() {
    return await this.seedService.executeSeed();
  }
}
