import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { QuanLyPhimService } from './quan-ly-phim.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { phanTrangDto } from 'src/quan-ly-nguoi-dung/dto/phanTrangDto';
import { phimPhanTrangDate } from './dto/phimPhanTrangDate';
import { searchStringDto } from 'src/quan-ly-nguoi-dung/dto/searchStringDto';
import { timKiemMaPhimDto } from './dto/timKiemMaPhim';
import { uploadDto } from './dto/uploadDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createPhimDto } from './dto/phimDto';

@Controller('QuanLyPhim')
@ApiTags('QuanLyPhim')
export class QuanLyPhimController {
  constructor(private readonly quanLyPhimService: QuanLyPhimService, private configService : ConfigService) {}

  @Get("LayDanhSachBanner")
  layDanhSachBanner(){
    try{
      return this.quanLyPhimService.layDanhSachBanner();
    }catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("LayDanhSachPhim")
  layDanhSachPhim(){
    try{
      return this.quanLyPhimService.layDanhSachPhim();
    }catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("LayDanhSachPhimPhanTrang")
  @ApiBody({type:phanTrangDto})
  layDanhSachPhimPhanTrang(@Body() body){
    try{
      let{currentPage, pageItem} = body
      return this.quanLyPhimService.layDanhSachPhimPhanTrang(currentPage, pageItem);
    }catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("LayDanhSachPhimPhanTrangNgay")
  @ApiBody({type:phimPhanTrangDate})
  layDanhSachPhimPhanTrangNgay(@Body() body){
    try{
      let{currentPage, pageItem, endDate, startDate} = body
      return this.quanLyPhimService.layDanhSachPhimPhanTrangNgay(currentPage, pageItem, endDate, startDate);
    }catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("TimKiemMaPhim")
  @ApiBody({type:timKiemMaPhimDto})
  timKiemMaPhim(@Body() body){
    try{
      let {maPhim} = body
      return this.quanLyPhimService.timKiemMaPhim(maPhim)
    }catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @ApiBody({
    type: uploadDto
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor("avatar",{
    storage:diskStorage({
      destination:process.cwd() + "/public/img",
      filename:(req, file, callback )=> callback(null, new Date().getTime()+"_"+file.originalname)
    })
  }))
  @Post("CapNhatHinhPhim")
  capNhatHinhPhim(@UploadedFile() file :Express.Multer.File, @Body('maPhim') maPhim){
    try{
      return this.quanLyPhimService.capNhatHinhPhim(file.filename,maPhim)
    }catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBody({
    type: createPhimDto
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor("avatar",{
    storage:diskStorage({
      destination:process.cwd() + "/public/img",
      filename:(req, file, callback )=> callback(null, new Date().getTime()+"_"+file.originalname)
    })
  }))
  @Post('CreatePhim')
  createPhim(@UploadedFile() file :Express.Multer.File, @Body() createPhimDto: createPhimDto) {
    return this.quanLyPhimService.createPhim(file, createPhimDto);
  }

  @Delete('DeletePhim/:maPhim')
  async xoaPhim(@Param('maPhim') maPhim: number) {
    try{
      
      return await this.quanLyPhimService.xoaPhim(maPhim);
    }catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
