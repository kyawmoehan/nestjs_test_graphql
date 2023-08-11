import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class PetsResolver {
    @Query(() => String)
    sayHello(): string {
        return 'Hello World!';
    }
}
