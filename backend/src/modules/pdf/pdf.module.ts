import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {PdfService } from './pdf.service';
import { EntityModule } from 'src/entity/entity.module';
import { HttpResponse } from 'src/common/httpResponse';
import { PdfController } from './pdf.controller';
import { GuardModule } from 'src/guards/guards.module';

@Module({
  imports: [ConfigModule.forRoot(),EntityModule, GuardModule],
  controllers: [PdfController],
  providers: [PdfService, HttpResponse],
})
export class PdfModule {}
