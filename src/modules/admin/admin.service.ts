import { Injectable } from '@nestjs/common';
import { Admin } from './admin.dto';

@Injectable()
export class AdminService {
  private readonly admins: Admin[] = [];

  create(admin: Admin) {
    this.admins.push(admin);
    console.log(this.admins);
  }

  findAll(): Admin[] {
    return this.admins;
  }
  getHello(): string {
    return 'Hello Admin';
  }
}
