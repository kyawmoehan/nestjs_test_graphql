import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOwnerInput {
  @Field()
  @IsNotEmpty()
  name: string;
}
