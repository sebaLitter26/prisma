import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/model/user';

@ObjectType()
export class AuthResponse {

    @Field({ description: 'JWT access token' })
    accessToken: string;

    @Field({ description: 'JWT refresh token' })
    refreshToken: string;

    @Field({ description: 'User' })
    user?: User;

}
