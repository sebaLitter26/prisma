import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateBuildingDTO } from './create-building.dto';

@InputType()
export class UpdateBuildingDTO extends PartialType(CreateBuildingDTO) {
  @IsNotEmpty()
  @Field(() => String)
  id: string;
}
