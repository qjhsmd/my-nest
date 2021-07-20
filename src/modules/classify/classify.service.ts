import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MyClassify } from './classify.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClassifyService {
  constructor(
    @InjectRepository(MyClassify)
    private classifyRepository: Repository<MyClassify>,
  ) {}

  findAll(): Promise<MyClassify[]> {
    try {
      return this.classifyRepository.find();
    } catch (err) {
      console.log(err);
      throw new HttpException(
        { message: '查询所有分类失败', err: err },
        HttpStatus.OK,
      );
    }
  }
  async saveClassify(MyClassify): Promise<void> {
    try {
      const res = await this.classifyRepository.save(MyClassify);
      console.log(res);
    } catch (err) {
      console.log(err);
      throw new HttpException(
        { message: '创建分类失败', err: err },
        HttpStatus.OK,
      );
    }
  }
  async remove(id: number): Promise<void> {
    try {
      await this.classifyRepository.delete(id);
    } catch (err) {
      console.log(err);
    }
  }
}
