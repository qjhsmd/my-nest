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

  async addComment(): Promise<any> {
    const artcle: any = {
      id: 40,
      title: '测试',
    };
    const params: any = {
      commentContent: '测试评论',
      artcleEntity: artcle,
    };
    this.commentRepository.save(params);
  }
}
