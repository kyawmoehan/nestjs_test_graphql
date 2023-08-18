import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from '../../roles/entities/role.entity';

@ObjectType()
export class Auth {
    @Field(() => Int)
    id: number;

    @Field()
    userName: string;

    @Field({ nullable: true })
    password: string;

    @Field(() => [Role])
    roles: Role[];

    @Field()
    access_token: string;
}
