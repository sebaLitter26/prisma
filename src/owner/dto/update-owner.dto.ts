import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateOwnerDTO } from './create-owner.dto';

@InputType()
export class UpdateOwnerDTO extends PartialType(CreateOwnerDTO) {
  @IsNotEmpty()
  @Field(() => String)
  id: string;
}
