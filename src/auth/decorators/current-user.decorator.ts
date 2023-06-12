import { createParamDecorator, ExecutionContext, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../../user/model/user';
//import { ValidRoles } from '../enums/valid-roles.enum';
import { Roles } from '@prisma/client';



export const CurrentUser = createParamDecorator( 
    ( roles: Roles[] = [], context: ExecutionContext  ) => {


        const ctx = GqlExecutionContext.create( context );
        const user: User = ctx.getContext().req.user;

        if ( !user ) {
            throw new InternalServerErrorException(`No user inside the request - make sure that we used the AuthGuard`);
        }

        if ( roles.length === 0 ) return user;

        for ( const role of user.roles ) {
            // TODO: Eliminar Valid Roles
            if ( roles.includes( role as Roles ) ) {
                return user;
            }
        }

        throw new ForbiddenException(
            `User ${ user.name } need a valid role [${ roles }]`
        )

})
