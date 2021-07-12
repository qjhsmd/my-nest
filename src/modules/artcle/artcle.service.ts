import { Injectable } from '@nestjs/common';
import { ArtcleEntity } from './artcle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtcleService {
  constructor(
    @InjectRepository(ArtcleEntity)
    private usersRepository: Repository<ArtcleEntity>,
  ) {}

  findAll(): Promise<ArtcleEntity[]> {
    return this.usersRepository.find();
  }
}
