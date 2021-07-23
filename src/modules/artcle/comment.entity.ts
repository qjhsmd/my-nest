import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ArtcleEntity } from './artcle.entity';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commentContent: string;

  @CreateDateColumn()
  create_time: Date;

  @ManyToOne(() => ArtcleEntity, (artcleEntity) => artcleEntity.commentEntity)
  artcleEntity: ArtcleEntity;
}
