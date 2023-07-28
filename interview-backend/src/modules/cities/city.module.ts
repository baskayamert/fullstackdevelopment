import { Module } from '@nestjs/common';
import { CityController } from './controllers/city.controller';
import { CityService } from './services/city.service';

@Module({
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
