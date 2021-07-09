import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artcle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column({ nullable: true })
  roles: string;

  @Column({ nullable: false })
  pass_word: string;

  @Column({ default: 'www.baidu,com', nullable: true })
  image: string;
}
