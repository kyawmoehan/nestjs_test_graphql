import { Injectable } from '@nestjs/common';
import { Pet } from './entities/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(Pet)
        private petsRepository: Repository<Pet>
    ) { }

    async crete(
        createPetInput: CreatePetInput,
        user: User
    ): Promise<Pet> {
        const newPet = this.petsRepository.create({
            ...createPetInput,
            user
        });
        return this.petsRepository.save(newPet);
    }

    async findAll(): Promise<Pet[]> {
        return this.petsRepository.find({
            relations: {
                user: true
            }
        });
    }

    async findOne(id: number): Promise<Pet> {
        return this.petsRepository.findOneOrFail({
            where: {
                id
            }
        });
    }
}
