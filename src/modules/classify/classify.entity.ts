import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ArtcleEntity } from '../artcle/artcle.entity';
@Entity()
export class MyClassify {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  classify_name: string;

  @Column({ nullable: false })
  pid: number;
  @OneToOne((type) => ArtcleEntity, (artcleEntity) => artcleEntity.classify)
  artcledata: ArtcleEntity;
}
