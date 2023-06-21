import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { SignupInput, LoginInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../user/model/user';
import { RefreshTokenInput } from './dto/inputs/refresh-token.input';
//import { ValidRoles } from './enums/valid-roles.enum';

@Resolver( () => AuthResponse )
export class AuthResolver {

  constructor(
    private readonly authService: AuthService
  ) {}

  @Mutation( () => AuthResponse , { name: 'signup' })
  async signup(
    @Args('signupInput') signupInput: SignupInput
  ): Promise<AuthResponse> {
    return this.authService.signup( signupInput );
  }

  @Mutation( () => AuthResponse , { name: 'login' })
  async login(
    @Args('loginInput') loginInput: LoginInput
  ): Promise<AuthResponse> {
    return this.authService.login( loginInput );
  }

  @Query( () => AuthResponse, { name: 'revalite'})
  @UseGuards( JwtAuthGuard )
  revalidateToken(
    @Args() { token }: RefreshTokenInput,
    @CurrentUser( /**[ ValidRoles.admin ] */  ) user: User
  ): AuthResponse {
    return this.authService.refreshToken( token );
  }

  @ResolveField('user')
  async user(@Parent() auth: Auth) {
    return await this.authService.getUserFromToken(auth.accessToken);
  }

}
