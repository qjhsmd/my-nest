import { Injectable } from '@nestjs/common';
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
    return this.classifyRepository.find();
  }
  async saveClassify(MyClassify): Promise<void> {
    try {
      const res = await this.classifyRepository.save(MyClassify);
      console.log(res);
    } catch (err) {
      return err;
    }
  }
}
