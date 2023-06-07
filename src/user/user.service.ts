import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
const bcrypt = require('bcryptjs');


import { User } from './model/user';

import { CreateUserDTO } from './dto/create-user.input';
import { UpdateUserDTO } from './dto/update-user.input';
import { ValidRoles } from './../auth/enums/valid-roles.enum';

import { SignupInput } from './../auth/dto/inputs/signup.input';
import { PrismaService } from '../core/prisma/prisma.service';

@Injectable()
export class UserService {
    private logger: Logger = new Logger('UsersService')


    constructor(private readonly data: PrismaService) {}
  
  
    async create( signupInput: SignupInput ) {
      
      try {
  
        return await this.data.user.create({
            data: {
              ...signupInput,
              password: bcrypt.hashSync( signupInput.password, 10 )
            }
        });
  
  
      } catch (error) {
        this.handleDBErrors( error );
      }
  
    }
  
    async findAll( roles: ValidRoles[] ) {
  
      if ( roles.length === 0 ) 
        return this.data.user.findMany({
          // TODO: No es necesario porque tenemos lazy la propiedad lastUpdateBy
          // relations: {
          //   lastUpdateBy: true
          // }
        });
  
      // ??? tenemos roles ['admin','superUser']

      return this.data.user.findMany({
        where: {
            roles: { in: ['superUser, admin']}
        }
      });
      /* return this.data.user.createQueryBuilder()
        .andWhere('ARRAY[roles] && ARRAY[:...roles]')
        .setParameter('roles', roles )
        .getMany(); */
  
    
    }
  
    async findOneByEmail( email: string ){
      try {
        return await this.data.user.findUnique({where: { email }});
      } catch (error) {
        throw new NotFoundException(`${ email } not found`);
        // this.handleDBErrors({
        //   code: 'error-001',
        //   detail: `${ email } not found`
        // });
      }
    }
  
    async findOneById( id: string ) {
      try {
        return await this.data.user.findUnique({where: { id }});
      } catch (error) {
        throw new NotFoundException(`${ id } not found`);
      }
    }
  
    async update(
      id: string, 
      updateUserInput: UpdateUserDTO,
      updateBy: User
    ): Promise<User> {

     
  
      try {
        return await this.data.user.upsert({
          create: {
            // ... data to create a User
            //data:{
              ...updateUserInput,
              lastUpdateBy: updateBy,
              id
            //}
            
          },
          update: {
            // ... in case it already exists, update
            data:{
              ...updateUserInput,
              lastUpdateBy: updateBy
            }
              
          },
          where: {
            id
            // ... the filter for the User we want to update
          }
          
        });
  
        //user.lastUpdateBy = updateBy;
  
        //return await this.data.user.create( user );
  
      } catch (error) {
        this.handleDBErrors( error );
      }
      
      
    }
  
    async block( id: string, adminUser: User ) {
      
      const userToBlock = await this.findOneById( id );
      if (userToBlock) {
        userToBlock.isActive = false;
        userToBlock.lastUpdateBy = adminUser;
    
        return await this.data.user.create( {data: userToBlock} );
      }else{
        throw new NotFoundException(
          `Este usuario no existe.`,
        );
  
      }
  
    }
    private handleDBErrors( error: any ): never {
  
      
      if (  error.code === '23505' ) {
        throw new BadRequestException( error.detail.replace('Key ','') );
      }
  
      if ( error.code == 'error-001' ) {
        throw new BadRequestException( error.detail.replace('Key ','') );
      }
      
      this.logger.error( error );
  
      throw new InternalServerErrorException('Please check server logs');
  
    }
  
}
