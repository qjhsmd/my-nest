import { Module } from '@nestjs/common';
import { DogController } from './dog.controller';
// import { AdminService } from './admin.service';
@Module({
  controllers: [DogController],
  // providers: [AdminService],
})
export class DogModule {}
