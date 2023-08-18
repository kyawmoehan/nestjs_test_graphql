import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateAuthInput {
  @Field()
  @IsAlpha()
  @IsNotEmpty()
  userName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password: string;
}
