
import { registerEnumType } from "@nestjs/graphql";
import { Roles } from "@prisma/client";

/* export enum ValidRoles {
    admin     = 'admin', 
    user      = 'user',  
    superUser = 'superUser'
} */

registerEnumType( Roles, { name: 'ValidRoles', description: 'Roles validos para el usuario (admin, user, superUser). '+ Roles } )


