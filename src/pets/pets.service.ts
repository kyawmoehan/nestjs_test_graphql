import { Injectable } from '@nestjs/common';
import { Pet } from './entities/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(Pet)
        private petsRepository: Repository<Pet>
    ) { }

    async crete(createPetInput: CreatePetInput): Promise<Pet> {
        const newPet = this.petsRepository.create(createPetInput);
        return this.petsRepository.save(newPet);
    }

    async findAll(): Promise<Pet[]> {
        return this.petsRepository.find();
    }
}
