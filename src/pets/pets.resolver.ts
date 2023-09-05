import { Args, Mutation, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { TypeormExceptionFilter } from '../exceptionfilters/typeorm-exception.filter';
import { UseFilters, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver(() => Pet)
@UseFilters(TypeormExceptionFilter)
export class PetsResolver {
    constructor(private petsService: PetsService) { }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Pet)
    createPet(
        @CurrentUser() user: User,
        @Args('createPetInput') createPetInput: CreatePetInput
    ): Promise<Pet> {
        return this.petsService.crete(createPetInput, user);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [Pet])
    pets(
        @Args('search', { nullable: true }) search: string | null
    ): Promise<Pet[]> {
        return this.petsService.findAll(search);
    }

    @ResolveField(() => Boolean)
    async isOwner(@Root() pet: Pet, @CurrentUser() user: User,): Promise<boolean> {
        return pet.user.id === user.id;
    }


    @UseGuards(JwtAuthGuard)
    @Query(() => Pet)
    getPet(
        @Args('id') id: number
    ): Promise<Pet> {
        return this.petsService.findOne(id);
    }
}
