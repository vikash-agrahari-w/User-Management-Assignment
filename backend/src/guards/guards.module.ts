import { Module } from '@nestjs/common';
import { BasicStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { HttpResponse } from 'src/common/httpResponse';
import { EntityModule } from 'src/entity/entity.module';

@Module({
  imports: [
    PassportModule,
    EntityModule,
  ],
  providers: [HttpResponse, BasicStrategy],
  exports: [],
})
export class GuardModule {}
