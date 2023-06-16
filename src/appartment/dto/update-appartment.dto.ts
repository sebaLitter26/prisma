import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateAppartmentDTO } from './create-appartment.dto';

@InputType()
export class UpdateAppartmentDTO extends PartialType(CreateAppartmentDTO) {
  @IsNotEmpty()
  @Field(() => String)
  id: string;
}
