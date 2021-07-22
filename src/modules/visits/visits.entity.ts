import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class VisitsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  host: string;

  @Column()
  city: string;

  @Column({ length: 1000 })
  userAgent: string;

  @Column()
  entrance: string;

  @Column()
  terminal: string;
  @Column()
  explorer: string;

  @CreateDateColumn()
  create_time: Date;
}
