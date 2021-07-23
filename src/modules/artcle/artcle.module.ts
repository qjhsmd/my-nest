import { Module } from '@nestjs/common';
import { ArtcleService } from './artcle.service';
import { CommentService } from './comment.service';
import { ArtcleController } from './artcle.controller';
import { ArtcleEntity } from './artcle.entity';
import { CommentEntity } from './comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheService } from '../app/cache.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArtcleEntity, CommentEntity])],
  providers: [ArtcleService, CacheService, CommentService],
  controllers: [ArtcleController],
  // exports: [ArtcleService],
})
export class ArtcleModule {}
