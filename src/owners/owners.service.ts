import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
// import { UpdateOwnerInput } from './dto/update-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner)
    private ownersRepository: Repository<Owner>
  ) { }

  async create(
    createOwnerInput: CreateOwnerInput
  ): Promise<Owner> {
    const newOwner = this.ownersRepository.create(createOwnerInput);
    return this.ownersRepository.save(newOwner);
  }

  async findAll(): Promise<Owner[]> {
    return this.ownersRepository.find({
      relations: {
        pets: true
      }
    });
  }

  async findOne(id: number): Promise<Owner> {
    return this.ownersRepository.findOneOrFail({
      where: {
        id
      }
    });
  }

  // update(id: number, updateOwnerInput: UpdateOwnerInput) {
  //   return `This action updates a #${id} owner`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} owner`;
  // }
}
