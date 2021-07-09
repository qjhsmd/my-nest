import { Injectable } from '@nestjs/common';
import { Artcle } from './artcle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtcleService {
  constructor(
    @InjectRepository(Artcle)
    private usersRepository: Repository<Artcle>,
  ) {}

  findAll(): Promise<Artcle[]> {
    return this.usersRepository.find();
  }
}
