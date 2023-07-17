import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateAppartmentDTO {
  @IsNotEmpty()
  @MaxLength(500, { message: 'Content is too long. Maximal length is 500 characters'})
  @MinLength(5, { message: 'Content is too short. Minimal length is 5 characters'})
  @Field({ nullable: false })
  content: string;

  @IsNotEmpty()
  @IsUUID()
  @Field(()=> ID,{ nullable: false })
  buildingId: string;

}
