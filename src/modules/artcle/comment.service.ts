import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, IsNull, Not } from 'typeorm';
import { ArtcleService } from './artcle.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    private readonly artcleService: ArtcleService,
  ) {}

  async addComment(comment: any): Promise<any> {
    try {
      const artcle: any = {
        id: comment.artcleId,
      };
      const params: any = {
        content: comment.content,
        artcleEntity: artcle,
      };
      await this.commentRepository.save(params);
      await this.artcleService.setcommentsCount(comment.artcleId);
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '添加评论失败' }, HttpStatus.OK);
    }
  }
  async listComment(query: any): Promise<any> {
    const res = await this.commentRepository.findAndCount({
      // relations: ['artcleEntity'],
      where: {
        artcleEntityId: query.artcleId,
      },
      order: {
        create_time: 'DESC',
      },
      skip: query.pageSize ? query.pageSize * (query.page - 1) : 0,
      take: query.pageSize ? query.pageSize : 9999,
    });
    return { total: res[1], list: res[0] };
  }
}
