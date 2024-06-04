import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {UserService } from './user.service';
import { EntityModule } from 'src/entity/entity.module';
import { HttpResponse } from 'src/common/httpResponse';
import { UserController } from './user.controller';
import { GuardModule } from 'src/guards/guards.module';

@Module({
  imports: [ConfigModule.forRoot(),EntityModule, GuardModule],
  controllers: [UserController],
  providers: [UserService, HttpResponse],
})
export class UserModule {}
