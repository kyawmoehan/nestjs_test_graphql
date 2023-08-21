import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OwnersService } from './owners.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { TypeormExceptionFilter } from '../exceptionfilters/typeorm-exception.filter';
import { UseFilters, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/role.decorators';
import { RoleEnum } from '../auth/enum/role.enum';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
// import { UpdateOwnerInput } from './dto/update-owner.input';

@Resolver(() => Owner)
@UseFilters(TypeormExceptionFilter)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) { }

  @Mutation(() => Owner)
  createOwner(@Args('createOwnerInput') createOwnerInput: CreateOwnerInput) {
    return this.ownersService.create(createOwnerInput);
  }

  @Roles(RoleEnum.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => [Owner], { name: 'owners' })
  findAll() {
    return this.ownersService.adminFindAll();
  }

  @Roles(RoleEnum.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Query(() => Owner, { name: 'owner' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ownersService.adminFindOne(id);
  }

  // @Mutation(() => Owner)
  // updateOwner(@Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput) {
  //   return this.ownersService.update(updateOwnerInput.id, updateOwnerInput);
  // }

  // @Mutation(() => Owner)
  // removeOwner(@Args('id', { type: () => Int }) id: number) {
  //   return this.ownersService.remove(id);
  // }
}
