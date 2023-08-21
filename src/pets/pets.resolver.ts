import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { TypeormExceptionFilter } from '../exceptionfilters/typeorm-exception.filter';
import { UseFilters, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Resolver(() => Pet)
@UseFilters(TypeormExceptionFilter)
export class PetsResolver {
    constructor(private petsService: PetsService) { }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Pet)
    createPet(
        @Args('createPetInput') createPetInput: CreatePetInput
    ): Promise<Pet> {
        return this.petsService.crete(createPetInput);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [Pet])
    pets(): Promise<Pet[]> {
        return this.petsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => Pet)
    getPet(
        @Args('id') id: number
    ): Promise<Pet> {
        return this.petsService.findOne(id);
    }
}
