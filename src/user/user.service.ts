import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
const bcrypt = require('bcryptjs');
import { Roles } from "@prisma/client";


import { User } from './model/user';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
//import { ValidRoles } from './../auth/enums/valid-roles.enum';

import { SignupInput } from './../auth/dto/inputs/signup.input';
import { PrismaService } from '../core/prisma/prisma.service';

@Injectable()
export class UserService {
    private logger: Logger = new Logger('UsersService')


    constructor(private readonly data: PrismaService) {}
  
  
    async create( signupInput: SignupInput ) {
    async create( signupInput: SignupInput ) {
      
      try {
  
        return await this.data.user.create({
            data: {
                ...signupInput,
                isActive: true,
                password: bcrypt.hashSync( signupInput.password, 10 )
            }
          });
  
  
      } catch (error) {
        this.handleDBErrors( error );
      }
  
    }
  
    async findAll( roles: Roles[] ) {
  
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
            roles: { in: ['superUser', 'admin']}
        }
      });
      /* return this.data.user.createQueryBuilder()
        .andWhere('ARRAY[roles] && ARRAY[:...roles]')
        .setParameter('roles', roles )
        .getMany(); */
  
    
    }
  
    async findOneByEmail( email: string ) {
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
    ) {
  
      try {
        return await this.data.user.upsert({
            create: {
                ...updateUserInput,
                id
            },
            update: {
                ...updateUserInput,
                id
            },
            where: { id }
        })
       
  
      } catch (error) {
        this.handleDBErrors( error );
      }
      
      
    }
  
    async block( id: string, adminUser: User ) {
    async block( id: string, adminUser: User ) {
      
      const userToBlock = await this.data.user.findUnique({where: {id} });
  
      userToBlock.isActive = false;
      userToBlock.lastUpdateBy = adminUser;
  
      return await this.data.user.create( { data:{...userToBlock}} );
  
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
