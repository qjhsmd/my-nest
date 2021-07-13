import { Injectable } from '@nestjs/common';
import { ArtcleEntity } from './artcle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtcleService {
  constructor(
    @InjectRepository(ArtcleEntity)
    private artcleRepository: Repository<ArtcleEntity>,
  ) {}

  async saveArtcle(artcle: ArtcleEntity): Promise<ArtcleEntity> {
    console.log(artcle);
    try {
      const res = await this.artcleRepository.save(artcle);
      console.log(res);
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
      ],
      skip: query.pageSize * (query.page - 1),
      take: query.pageSize,
    });
    return { total, list };
  }
}
