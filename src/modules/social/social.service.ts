import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MsgEntity } from '../msg/msg.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class SocialService {
  constructor(
    @InjectRepository(MsgEntity)
    private socialRepository: Repository<MsgEntity>,
  ) {}

  findAll(): Promise<MsgEntity[]> {
    // return this.socialRepository.query('select * from social');
    return getRepository(MsgEntity).query('select * from social');
  }
}
