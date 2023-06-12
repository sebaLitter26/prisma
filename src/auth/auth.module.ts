import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

import { UserModule } from './../user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [ AuthResolver, AuthService, JwtStrategy, UserService ],
  exports: [ JwtStrategy, PassportModule, JwtModule ],
  imports: [

    ConfigModule,

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => ({
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '4h'
          }
        })
    }),

    //UserModule,


  ]
})
export class AuthModule {}
