import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { Roles } from "@prisma/client";

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  
        @Field(() => ID)
        @IsUUID()
        id: string;
      
        @Field( () => [String], { nullable: true })
        @IsArray()
        @IsOptional()
        roles: Roles[];
      
        @Field( () => Boolean, { nullable: true })
        @IsBoolean()
        @IsOptional()
        isActive?: boolean;

        /* @Field( () => User, { nullable: true })
        @IsOptional()
        lastUpdateBy?: User */
}
