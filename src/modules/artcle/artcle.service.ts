import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ArtcleEntity } from './artcle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ArtcleService {
  constructor(
    @InjectRepository(ArtcleEntity)
    private artcleRepository: Repository<ArtcleEntity>,
  ) {}

  async saveArtcle(artcle: ArtcleEntity): Promise<ArtcleEntity> {
    try {
      const res = await this.artcleRepository.save(artcle);
      return res;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async findAll(query: any): Promise<any> {
    const total = await this.artcleRepository.count();
    const list = await this.artcleRepository.find({
      select: [
        'title',
        'classify_name',
        'author',
        'create_time',
        'view_count',
        'update_time',
        'artcle_describe',
        'id',
      ],
      skip: query.pageSize * (query.page - 1),
      take: query.pageSize,
    });
    return { total, list };
  }

  async findOne(id: number): Promise<any> {
    try {
      return await this.artcleRepository.findOne(id);
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '查询文章详情失败' }, HttpStatus.OK);
    }
  }

  async updateArtcle(artcle: ArtcleEntity): Promise<ArtcleEntity> {
    try {
      return await this.artcleRepository.save(artcle);
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '更新文章详情失败' }, HttpStatus.OK);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      return await this.artcleRepository.delete(id);
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '删除文章失败' }, HttpStatus.OK);
    }
  }
}
