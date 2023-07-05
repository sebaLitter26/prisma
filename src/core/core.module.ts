import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { PrismaModule } from './prisma/prisma.module';
import { SmsModule } from './twilio-sms/sms.module';

@Module({
  imports: [GraphqlModule, PrismaModule, SmsModule],
})
export class CoreModule {}
