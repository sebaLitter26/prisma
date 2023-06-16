import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateBuildingDTO {
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(5)
  @Field({ nullable: true })
  address: string;
}
