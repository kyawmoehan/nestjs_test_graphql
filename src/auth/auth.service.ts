import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Role } from '../roles/entities/role.entity';
import { RolesService } from '../roles/roles.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import hashGenerate from '../hash/hash.generate';
import { CreateAuthInput } from './dto/auth.input';
import { RoleEnum } from './enum/role.enum';
import hashCheck from '../hash/hash.check';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly usersService: UsersService,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    private readonly rolesService: RolesService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) { }

  async signUp(createAuthInput: CreateAuthInput) {
    try {
      const hasUserName = await this.usersService.findOneByUserName(createAuthInput.userName);
      if (hasUserName) throw new HttpException('User Name already sing up!', HttpStatus.BAD_REQUEST);

      const hash = await hashGenerate(createAuthInput.password);
      createAuthInput.password = hash;

      const roles = await this.rolesService.findByName(RoleEnum.User);

      const newUser = this.usersRepository.create({ ...createAuthInput, roles });

      const getUser = await this.usersRepository.save(newUser);
      const token = await this.accessToken(getUser.id, getUser.userName);
      delete getUser.password;
      return {
        ...getUser,
        access_token: token,
      }
    } catch (error) {
      throw error;
    }
  }

  async signIn(createAuthInput: CreateAuthInput): Promise<any> {
    // find the user by email 
    const user = await this.usersService.findOneByUserName(createAuthInput.userName);
    if (!user) throw new ForbiddenException('Credentials incorrect!');

    // compare password
    const pwMatch = await hashCheck({
      userPassword: user.password,
      signInPassword: createAuthInput.password
    });
    if (!pwMatch) throw new ForbiddenException('Credentials incorrect!');

    // send back user
    delete user.password;
    const token = await this.accessToken(user.id, user.userName);
    return {
      ...user,
      access_token: token,
    }
  }

  async accessToken(userId: number, userName: string): Promise<string> {
    const payload = {
      sub: userId,
      userName: userName
    }
    const secretKey = this.config.get('JWT_SECRET');
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '100d',
      secret: secretKey
    })
    return token;
  }

}
