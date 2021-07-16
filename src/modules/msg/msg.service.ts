import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MsgEntity } from './msg.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MsgService {
  constructor(
    @InjectRepository(MsgEntity)
    private msgRepository: Repository<MsgEntity>,
  ) {}

  findAll(): Promise<MsgEntity[]> {
    return this.msgRepository.find();
  }
  async saveMsg(MsgEntity): Promise<void> {
    try {
      const res = await this.msgRepository.save(MsgEntity);
      console.log(res);
    } catch (err) {
      console.log(err);
      // return err;
      throw new HttpException(
        { message: '创建留言失败', err: err },
        HttpStatus.OK,
      );
    }
  }
  async remove(id: number): Promise<void> {
    try {
      await this.msgRepository.delete(id);
    } catch (err) {
      console.log(err);
    }
  }
}
