import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';

@Resolver(() => Pet)
export class PetsResolver {
    constructor(private petsService: PetsService) { }

    @Mutation(() => Pet)
    createPet(
        @Args('createPetInput') createPetInput: CreatePetInput
    ): Promise<Pet> {
        return this.petsService.crete(createPetInput);
    }

    @Query(() => [Pet])
    pets(): Promise<Pet[]> {
        return this.petsService.findAll();
    }

    @Query(() => Pet)
    getPet(
        @Args('id') id: number
    ): Promise<Pet> {
        return this.petsService.findOne(id);
    }
}
