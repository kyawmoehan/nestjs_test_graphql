import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async me(user: User): Promise<User> {
    return this.findOneByUserName(user.userName);
  }

  async findOneByUserName(userName: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        userName
      },
      relations: {
        roles: true
      }
    });
  }
}
