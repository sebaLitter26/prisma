import { Module } from '@nestjs/common';
import { AppartmentService } from './Appartment.service';
import { AppartmentResolver } from './Appartment.resolver';

@Module({
  providers: [AppartmentService, AppartmentResolver],
})
export class AppartmentModule {}
