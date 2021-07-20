import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ArtcleEntity } from './artcle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, IsNull, Not } from 'typeorm';

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
      throw new HttpException({ message: '创建文章失败' }, HttpStatus.OK);
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
        'artcle_status',
        'id',
      ],
      order: {
        update_time: 'DESC',
      },
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

  async issue(id: number): Promise<DeleteResult> {
    try {
      const artcle: any = await this.artcleRepository.findOne(id);
      artcle.artcle_status = 20;
      return await this.artcleRepository.save(artcle);
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '发布文章成功' }, HttpStatus.OK);
    }
  }
  async unIssue(id: number): Promise<DeleteResult> {
    try {
      const artcle: any = await this.artcleRepository.findOne(id);
      artcle.artcle_status = 30;
      return await this.artcleRepository.save(artcle);
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '取消发布文章成功' }, HttpStatus.OK);
    }
  }

  //博客
  async blogFindAll(query: any): Promise<any> {
    try {
      const total = await this.artcleRepository.count({
        where: {
          classify_id: query.classify_id ? query.classify_id : Not(IsNull()),
          artcle_status: 20,
        },
      });
      const list = await this.artcleRepository.find({
        select: [
          'title',
          'classify_name',
          'author',
          'create_time',
          'view_count',
          'update_time',
          'artcle_describe',
          'artcle_status',
          'image_uri',
          'id',
        ],
        where: {
          classify_id: query.classify_id ? query.classify_id : Not(IsNull()),
          artcle_status: 20,
        },
        order: {
          update_time: 'DESC',
        },
        skip: query.pageSize * (query.page - 1),
        take: query.pageSize,
      });
      return { total, list };
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '查询文章列表失败' }, HttpStatus.OK);
    }
  }

  async findBlogOne(id: number): Promise<any> {
    try {
      const artcle: any = await this.artcleRepository.findOne(id);
      artcle.view_count = artcle.view_count + 1;
      await this.artcleRepository.save(artcle);
      return artcle;
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '查询文章详情失败' }, HttpStatus.OK);
    }
  }
  // 访问统计
  async visitBlog(id: number): Promise<DeleteResult> {
    try {
      const artcle: any = await this.artcleRepository.findOne({
        where: {
          id: id,
        },
      });
      artcle.view_count = artcle.view_count + 1;
      return await this.artcleRepository.save(artcle);
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '更新浏览数失败' }, HttpStatus.OK);
    }
  }
}
