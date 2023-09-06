import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Pet } from './pet.entity';

@ObjectType()
export class MetaInfo {
    @Field(() => Int)
    totalItems: number;

    @Field(() => Int)
    totalCount: number;

    @Field()
    hasNextPage: boolean;

    @Field(() => Int)
    totalPage: number;
}

@ObjectType()
export class PetsPagination {
    @Field(() => [Pet])
    items: Pet[];

    @Field(() => MetaInfo)
    meta: MetaInfo;
}

