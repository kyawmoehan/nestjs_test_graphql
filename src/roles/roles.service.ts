import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>
  ) { }

  async create(createRoleInput: CreateRoleInput): Promise<Role> {
    const hasRole = await this.findOneByName(createRoleInput.name);
    if (hasRole) throw new ConflictException('Role already exit!');

    const newRole = this.rolesRepository.create(createRoleInput);
    return this.rolesRepository.save(newRole);
  }

  async findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  async findOne(id: number): Promise<Role> {
    return this.rolesRepository.findOneOrFail({
      where: {
        id
      }
    });
  }

  async findOneByName(name: string): Promise<Role> {
    return this.rolesRepository.findOne({
      where: {
        name
      }
    });
  }

  async update(
    id: number,
    updateRoleInput: UpdateRoleInput
  ): Promise<Role> {
    const hasRole = await this.findOneByName(updateRoleInput.name);
    if (hasRole) throw new ConflictException('Role already exit!');

    const role = await this.findOne(id);
    const updateRole = this.rolesRepository.create({
      ...role,
      ...updateRoleInput
    });
    return this.rolesRepository.save(updateRole);
  }

  async remove(id: number): Promise<Role> {
    const role = await this.findOne(id);
    await this.rolesRepository.delete(id);
    return role;
  }
}
