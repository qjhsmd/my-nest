import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ArtcleEntity } from './artcle.entity';
import { CommentEntity } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, IsNull, Not } from 'typeorm';
import { CacheService } from '../app/cache.service';

@Injectable()
export class ArtcleService {
  constructor(
    @InjectRepository(ArtcleEntity)
    @InjectRepository(CommentEntity)
    private artcleRepository: Repository<ArtcleEntity>,
    private readonly cacheService: CacheService,
  ) {}

  async saveArtcle(artcle: ArtcleEntity): Promise<ArtcleEntity> {
    try {
      // const params: any = {
      //   commentContent: '测试评论333',
      // };
      // const params1: any = {
      //   commentContent: '测试评论444',
      // };
      // artcle.commentEntity = [params, params1];

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

  async findBlogOne(id: string, header: string): Promise<any> {
    try {
      const redisName = 'blog_' + header + '_' + id;
      const res = await this.cacheService.get(redisName);
      const artcle: any = await this.artcleRepository.findOne(id);
      if (res === null) {
        // 如果没有缓存，浏览量加1
        await this.cacheService.set(redisName, true, 300);
        artcle.view_count = artcle.view_count + 1;
        await this.artcleRepository.save(artcle);
        console.log('博客' + redisName + '浏览量加1');
      } else {
        console.log('博客' + redisName + '的本次访问不计入浏览量');
      }
      return artcle;
    } catch (err) {
      console.log(err);
      throw new HttpException({ message: '查询文章详情失败' }, HttpStatus.OK);
    }
  }
}
