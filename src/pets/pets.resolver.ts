import { Args, Int, Mutation, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { TypeormExceptionFilter } from '../exceptionfilters/typeorm-exception.filter';
import { Search, UseFilters, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { PetsPagination } from './entities/PetsPagination';
import { limits } from 'argon2';

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
        @Args('search', { nullable: true }) search: string | null,
        @Args('page', { type: () => Int, nullable: true, defaultValue: 1 }) page: number,
        @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 }) limit: number
    ): Promise<Pet[]> {
        return this.petsService.findAll(page, limit, search);
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
