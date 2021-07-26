import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, IsNull, Not } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  async addComment(comment: any): Promise<any> {
    const artcle: any = {
      id: comment.artcleId,
    };
    const params: any = {
      content: comment.content,
      // artcleId: comment.artcleId,
      artcleEntity: artcle,
    };
    console.log(params);
    this.commentRepository.save(params);
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
