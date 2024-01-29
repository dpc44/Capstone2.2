import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { QuanLyDatVeModule } from './quan-ly-dat-ve/quan-ly-dat-ve.module';
import { QuanLyNguoiDungModule } from './quan-ly-nguoi-dung/quan-ly-nguoi-dung.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { QuanLyPhimModule } from './quan-ly-phim/quan-ly-phim.module';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), QuanLyDatVeModule, QuanLyNguoiDungModule, QuanLyPhimModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
// nest g resource [ten module]--no--spec