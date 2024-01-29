import { Controller, Get, HttpException, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { QuanLyRapService } from './quan-ly-rap.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Controller('QuanLyRap')
@ApiTags('QuanLyRap')
export class QuanLyRapController {
  constructor(private readonly quanLyRapService: QuanLyRapService, private configService : ConfigService) {}

  @Get("LayThongTinHeThongRap/:maHeThongRap")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  layThongTinHeThongRap(@Param("maHeThongRap") maHeThongRap: string){
    try{
      return this.quanLyRapService.layThongTinHeThongRap(maHeThongRap);
    }catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("LayThongTinCumRapTheoHeThong/:maHeThongRap")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  layThongTinCumRapTheoHeThong(@Param("maHeThongRap") maHeThongRap: string){
    try{
      return this.quanLyRapService.LayThongTinCumRapTheoHeThong(maHeThongRap);
    }catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("LayThongTinLichChieuHeThongRap/:maHeThongRap")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  layThongTinLichChieuHeThongRap(@Param("maHeThongRap") maHeThongRap: string){
    try{
      return this.quanLyRapService.layThongTinLichChieuHeThongRap(maHeThongRap);
    }catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get("LayThongTinLichChieuPhim/:maPhim")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  layThongTinLichChieuPhim(@Param("maPhim") maPhim: string){
    try{
      return this.quanLyRapService.layThongTinLichChieuPhim(maPhim);
    }catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
