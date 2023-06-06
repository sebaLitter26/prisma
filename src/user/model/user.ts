import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { ValidRoles } from './../../auth/enums/valid-roles.enum';
import { IsEnum } from 'class-validator';

@ObjectType()
export class User {

  @Field( () => ID )
  id: string;

  @Field( () => String )
  name: string;

  @Field( () => String )
  email: string;

  @Field( () => String )
  password?: string;

  @Field( () => [ValidRoles], { description: 'Roles del Usuario' } )
  roles: ValidRoles[];

  @Field( () => Boolean, { nullable: true } )
  isActive: boolean;
  
  //TODO: relaciones
  //@ManyToOne( () => User, (user) => user.lastUpdateBy, { nullable: true, lazy: true })
  //@JoinColumn({ name: 'lastUpdateBy' })
  /* @Field( () => User, { nullable: true, description: 'lastUpdateBy' })
  lastUpdateBy?: User; */
}
