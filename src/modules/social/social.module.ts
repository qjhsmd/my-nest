import { Module } from '@nestjs/common';
import { MsgService } from './social.service';
import { ClassifyController } from './social.controller';
import { MsgEntity } from '../msg/msg.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MsgEntity])],
  providers: [MsgService],
  controllers: [ClassifyController],
  exports: [MsgService],
})
export class SocialModule {}
