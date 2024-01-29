import { Module } from '@nestjs/common';
import { QuanLyRapService } from './quan-ly-rap.service';
import { QuanLyRapController } from './quan-ly-rap.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [ConfigModule, JwtModule.register({})],
  controllers: [QuanLyRapController],
  providers: [QuanLyRapService],
})
export class QuanLyRapModule {}
