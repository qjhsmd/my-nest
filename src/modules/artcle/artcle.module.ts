import { Module } from '@nestjs/common';
import { ArtcleService } from './artcle.service';
import { ArtcleController } from './artcle.controller';

@Module({
  providers: [ArtcleService],
  controllers: [ArtcleController],
  // exports: [AuthService],
})
export class ArtcleModule {}
