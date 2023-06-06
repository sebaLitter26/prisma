import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/model/user';

@ObjectType()
export class AuthResponse {

    @Field( () => String )
    token: string;

    @Field( () => User )
    user: User;

}
