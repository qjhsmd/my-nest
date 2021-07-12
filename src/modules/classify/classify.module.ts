import { Module } from '@nestjs/common';
import { ClassifyService } from './classify.service';
import { ClassifyController } from './classify.controller';
import { MyClassify } from './classify.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MyClassify])],
  providers: [ClassifyService],
  controllers: [ClassifyController],
  exports: [ClassifyService],
})
export class ClassifyModule {}
