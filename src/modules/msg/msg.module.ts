import { Module } from '@nestjs/common';
import { MsgService } from './msg.service';
import { MsgController } from './msg.controller';
import { MsgEntity } from './msg.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MsgEntity])],
  providers: [MsgService],
  controllers: [MsgController],
  exports: [MsgService],
})
export class MsgModule {}
