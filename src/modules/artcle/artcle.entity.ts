import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MyClassify } from '../classify/classify.entity';
@Entity()
export class ArtcleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: false, default: 0 })
  classify_id: number;

  @Column({ nullable: false, default: 0 })
  classify_name: string;

  @Column({ default: 'test', nullable: true })
  author: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;

  @Column({ default: 0, nullable: true })
  view_count: number;

  @Column({ default: 0, nullable: true })
  comments_count: number;

  @Column({ default: 'test', nullable: true })
  artcle_describe: string;

  @Column()
  publish_time: Date;

  @OneToOne((type) => MyClassify, (MyClassify) => MyClassify.artcledata)
  @JoinColumn()
  classify: MyClassify;
}
