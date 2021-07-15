import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column({ nullable: true })
  roles: string;

  @Column({ nullable: false })
  pass_word: string;

  @Column({
    default:
      'https://img2.woyaogexing.com/2021/07/15/5032080dcd8844f7bbdd89b6ac022bdf!400x400.png',
    nullable: true,
  })
  image: string;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
