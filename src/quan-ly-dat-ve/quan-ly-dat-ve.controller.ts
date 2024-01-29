import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { QuanLyDatVeService } from './quan-ly-dat-ve.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { taoLichChieuDto } from './dto/taoLichChieuDto';
import { datVeDto } from './dto/datVeDto';
import { AuthGuard } from '@nestjs/passport';
@Controller('QuanLyDatVe')
@ApiTags('QuanLyDatVe')
export class QuanLyDatVeController {
  constructor(private readonly quanLyDatVeService: QuanLyDatVeService,
    private configService: ConfigService) {

  }

  @Get("LayDanhSachPhongVe/:ma_lich_chieu")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  layDanhSachPhongVe(@Param("ma_lich_chieu") maLichChieu: number) {
    try {
      return this.quanLyDatVeService.layDanhSachPhongVe(maLichChieu);
    } catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  @ApiBody({
    type: taoLichChieuDto
  })
  @Post("TaoLichChieu")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  taoLichChieu(@Body() body) {
    try {
      let { maPhim, ngayChieuGioChieu, maRap, giaVe } = body
      return this.quanLyDatVeService.taoLichChieu(maPhim, ngayChieuGioChieu, maRap, giaVe);
    } catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("DatVe")
  @ApiBody({ type: datVeDto })
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  datVe(@Body() body, @Req() req) {
    try {
      let id = req.user.data.userId;
      let { maLichChieu, maGhe } = body
      return this.quanLyDatVeService.datVe(id, maLichChieu, maGhe);
    } catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
