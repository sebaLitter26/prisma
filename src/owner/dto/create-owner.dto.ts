import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateOwnerDTO {
  @IsNotEmpty()
  @MaxLength(500)
  @MinLength(4)
  @Field({ nullable: false })
  content: string;

  @IsNotEmpty()
  @Field({ nullable: false })
  appartmentId: string;
}
