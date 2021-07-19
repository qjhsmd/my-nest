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

  @Column({ default: '', nullable: true })
  artcle_describe: string;

  @Column({ nullable: true, length: 1000 })
  image_uri: string;
  @Column({ nullable: true, length: 1000 })
  source_uri: string;

  @Column({ default: false })
  comment_disabled: boolean;

  @Column()
  platforms: string;

  @Column()
  publish_time: Date;

  @Column()
  importance: number;

  @Column({ default: 10 }) //10 未发布  20 发布 30 关闭
  artcle_status: number;

  @OneToOne((type) => MyClassify, (MyClassify) => MyClassify.artcledata)
  @JoinColumn()
  classify: MyClassify;
}
