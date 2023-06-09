import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        introspection: true,
        playground: true,
        autoSchemaFile: join(process.cwd(), 'src/core/graphql/api-schema.gql'),
    }),
  ],
})
export class GraphqlModule {}
