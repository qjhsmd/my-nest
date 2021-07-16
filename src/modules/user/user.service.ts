import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { searchUser } from './user.interface';
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
      // return err;
      throw new HttpException(
        { message: '创建用户失败', err: err },
        HttpStatus.OK,
      );
    }
  }
  async findAll(query): Promise<any> {
    const total = await this.usersRepository.count();
    const list = await this.usersRepository.find({
      select: [
        'user_name',
        'roles',
        'image',
        'id',
        'create_time',
        'update_time',
      ],
      skip: query.pageSize * (query.page - 1),
      take: query.pageSize,
    });
    return { total, list };
  }

  async findOne(id: number): Promise<any> {
    const res = await this.usersRepository.findOne(id);
    return {
      id: res.id,
      image: res.image,
      roles: res.roles,
      user_name: res.user_name,
    };
  }

  async userLogin(user_name: string, pass_word: string): Promise<User> {
    try {
      const myUser: any = await this.usersRepository.findOne({
        user_name: user_name,
      });
      if (myUser && myUser.pass_word === pass_word) {
        return myUser;
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      return await this.usersRepository.delete(id);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // 博客端
  async baseInfo(): Promise<DeleteResult> {
    try {
      return await this.usersRepository.query('select * from base_info');
    } catch (err) {
      console.log(err);
      return err;
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
