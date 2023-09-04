import { Field, InputType } from "@nestjs/graphql";
import { IsAlpha, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class CreatePetInput {
    @Field()
    @IsAlpha()
    @IsNotEmpty()
    name: string;

    @Field({ nullable: true })
    @IsOptional()
    type: string;
}