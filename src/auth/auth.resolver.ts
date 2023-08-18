import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/auth.input';
import { Auth } from './objectTypes/auth.objecttype';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => Auth)
  signUp(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return this.authService.signUp(createAuthInput);
  }

  @Mutation(() => Auth)
  signIn(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return this.authService.signIn(createAuthInput);
  }
}
