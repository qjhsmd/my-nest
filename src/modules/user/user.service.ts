import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection,
  ) {}

  async saveUser(user: User): Promise<void> {
    try {
      const res = await this.usersRepository.save(user);
      console.log(res);
    } catch (err) {
      return err;
    }
  }
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOneByUserName(user_name: string, pass_word: string): Promise<User> {
    try {
      const myUser: any = this.usersRepository.findOne({
        user_name: user_name,
      });
      if (myUser && myUser.pass_word === pass_word) {
        console.log(myUser);
        return myUser;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (err) {
      console.log(err);
    }
  }
  // 测试事务
  // async createMany(users: User[]) {
  //   const queryRunner = this.connection.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     await queryRunner.manager.save(users[0]);
  //     await queryRunner.manager.save(users[1]);

  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     //如果遇到错误，可以回滚事务
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     //你需要手动实例化并部署一个queryRunner
  //     await queryRunner.release();
  //   }
  // }
}
