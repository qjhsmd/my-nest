import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { VisitsEntity } from './visits.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class VisitsService {
  constructor(
    @InjectRepository(VisitsEntity)
    private repository: Repository<VisitsEntity>,
  ) {}

  async findAll(query): Promise<any> {
    try {
      const res = await this.repository.findAndCount({
        order: {
          create_time: 'DESC',
        },
        skip: query.pageSize * (query.page - 1),
        take: query.pageSize,
      });
      return { total: res[1], list: res[0] };
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '查询访问列表失败' }, HttpStatus.OK);
    }
  }

  async saveVisits(VisitsEntity): Promise<void> {
    try {
      const res = await this.repository.save(VisitsEntity);
      console.log(res);
    } catch (err) {
      throw new HttpException(
        { message: '保存访问记录失败', err: err },
        HttpStatus.OK,
      );
    }
  }
}
