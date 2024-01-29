import { Module } from '@nestjs/common';
import { QuanLyNguoiDungService } from './quan-ly-nguoi-dung.service';
import { QuanLyNguoiDungController } from './quan-ly-nguoi-dung.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [ConfigModule, JwtModule.register({})],
  controllers: [QuanLyNguoiDungController],
  providers: [QuanLyNguoiDungService],
})
export class QuanLyNguoiDungModule {}
