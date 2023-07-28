import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CityModule } from './modules/cities/city.module';

@Module({
  imports: [CityModule],
  controllers: [AppController]
})
export class AppModule {}
