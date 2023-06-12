import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ValidRolesArgs } from './dto/args/roles.arg';
import { ValidRoles } from '../auth/enums/valid-roles.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '@prisma/client';

@Resolver(() => User)
@UseGuards( JwtAuthGuard )
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'user' })
  async findAll(
    @Args() validRoles: ValidRolesArgs,
    @CurrentUser([Roles.admin, Roles.superUser ]) user: User
  ):Promise<User[]> {

    return this.userService.findAll( validRoles.roles );
  }

  @Query(() => User, { name: 'user' })
  findOne( 
    @Args('id', { type: () => ID }, ParseUUIDPipe ) id: string,
    @CurrentUser([Roles.admin, Roles.superUser ]) user: User
  ): Promise<User> {
    
    return this.userService.findOneById(id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser([Roles.admin ]) user: User
  ): Promise<User> {
    return this.userService.update(updateUserInput.id, updateUserInput, user );
  }

  @Mutation(() => User, { name: 'blockUser' })
  blockUser( 
    @Args('id', { type: () => ID }, ParseUUIDPipe ) id: string,
    @CurrentUser([ Roles.admin ]) user: User
  ): Promise<User> {
    return this.userService.block(id, user );
  }

  /* @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  } */
}
