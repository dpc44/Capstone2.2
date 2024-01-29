import { Module } from '@nestjs/common';
import { QuanLyDatVeService } from './quan-ly-dat-ve.service';
import { QuanLyDatVeController } from './quan-ly-dat-ve.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports:[ConfigModule, JwtModule.register({})],
  controllers: [QuanLyDatVeController],
  providers: [QuanLyDatVeService],
})
export class QuanLyDatVeModule {}
