import { Injectable } from '@nestjs/common';
import { Pet } from './entities/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { OwnersService } from '../owners/owners.service';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(Pet)
        private petsRepository: Repository<Pet>,
        private ownersService: OwnersService
    ) { }

    async crete(createPetInput: CreatePetInput): Promise<Pet> {
        const owner = await this.ownersService.findOne(createPetInput.ownerId);
        const newPet = this.petsRepository.create({
            ...createPetInput,
            owner
        });
        return this.petsRepository.save(newPet);
    }

    async findAll(): Promise<Pet[]> {
        return this.petsRepository.find({
            relations: {
                owner: true
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
