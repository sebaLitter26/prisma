import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateTenantDTO } from './create-tenant.dto';

@InputType()
export class UpdateTenantDTO extends PartialType(CreateTenantDTO) {
  @IsNotEmpty()
  @Field(() => String)
  id: string;
}
