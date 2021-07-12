import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MyClassify {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  classify_name: string;

  @Column({ nullable: false })
  pid: number;
}
