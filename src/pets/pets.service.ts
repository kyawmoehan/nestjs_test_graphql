import { Injectable } from '@nestjs/common';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
    async findAll(): Promise<Pet[]> {
        const pet = new Pet();
        pet.id = 1;
        pet.name = "Bo Phyu";

        return [pet];
    }
}
