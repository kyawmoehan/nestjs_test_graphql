import { IsNotEmpty } from 'class-validator';
import { CreateRoleInput } from './create-role.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;
}
