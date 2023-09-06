import { Injectable } from '@nestjs/common';
import { Pet } from './entities/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { User } from '../users/entities/user.entity';
import { generatePaginationInfo } from '../helper/pagination/paginationinfo';

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

    // async findAll(
    //     search: string | null
    // ): Promise<Pet[]> {
    //     const where = search
    //         ? [
    //             { name: ILike(`%${search}%`) },
    //             { user: { userName: ILike(`%${search}%`) } }
    //         ]
    //         : {};

    //     return this.petsRepository.find({
    //         where,
    //         relations: {
    //             user: true
    //         }
    //     });
    // }


    async findAll(
        page: number,
        limit: number,
        search: string | null
    ) {
        const skip = (page - 1) * limit;

        const queryBuilder = this.petsRepository
            .createQueryBuilder('pet')
            .leftJoinAndSelect('pet.user', 'user');

        if (search) {
            queryBuilder.where(
                'pet.name ILIKE :search OR user.userName ILIKE :search',
                { search: `%${search}%` },
            );
        }
        const [pets, totalCount] = await queryBuilder
            .skip(skip)
            .take(limit)
            .getManyAndCount();

        const totalItems = pets.length;
        const paginationInfo = generatePaginationInfo(totalItems, totalCount, page, limit);

        return pets;
    }


    async findOne(id: number): Promise<Pet> {
        return this.petsRepository.findOneOrFail({
            where: {
                id
            },
            relations: {
                user: true
            }
        });
    }
}
