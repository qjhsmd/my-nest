import { Module } from '@nestjs/common';
import { ArtcleService } from './artcle.service';
import { ArtcleController } from './artcle.controller';
import { ArtcleEntity } from './artcle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheService } from '../app/cache.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArtcleEntity])],
  providers: [ArtcleService, CacheService],
  controllers: [ArtcleController],
  // exports: [AuthService],
})
export class ArtcleModule {}
