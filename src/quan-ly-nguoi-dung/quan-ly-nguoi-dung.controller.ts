import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { QuanLyNguoiDungService } from './quan-ly-nguoi-dung.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { dangKyDto } from './dto/dangKyDto';
import { loginDto } from './dto/loginDto';
import { searchStringDto } from './dto/searchStringDto';
import { searchStringPageDto } from './dto/searchStringPageDto';
import { phanTrangDto } from './dto/phanTrangDto';
import { capNhatUserDto } from './dto/capNhatUserDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('QuanLyNguoiDung')
@ApiTags('QuanLyNguoiDung')
export class QuanLyNguoiDungController {
  constructor(private readonly quanLyNguoiDungService: QuanLyNguoiDungService,private configService : ConfigService) {}

  
  @Post("DangKy")
  @ApiBody({
    type:dangKyDto
  })
  dangKy(@Body() body){
    try{
      let{matKhau,email,soDt,hoTen, loaiNguoiDung} = body
      return this.quanLyNguoiDungService.dangKy(matKhau,email,soDt,hoTen, loaiNguoiDung);
    }catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("Login")
  @ApiBody({
    type:loginDto
  })
  login(@Body() body){
    
    try{
      let{email,matKhau} = body
      return this.quanLyNguoiDungService.login(email, matKhau);
    }catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Get("LayDanhSachNguoiDung")
  layDanhSachNguoiDung(){
    try{
      return this.quanLyNguoiDungService.layDanhSachNguoiDung();
    }catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('LayDanhSachNguoiDungPhanTrang')
  @ApiBody({
    type:phanTrangDto
  })
  layDanhSachNguoiDungPhanTrang(@Body() body) {
    try {
      const { currentPage, pageItem } = body;
      return this.quanLyNguoiDungService.layDanhSachNguoiDungPhanTrang(currentPage, pageItem);
    } catch (exception) {
      if (exception.status !== 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException('Lỗi....', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Post("TimKiemNguoiDung")
  @ApiBody({
    type:searchStringDto
  })
  timKiemNguoiDung(@Body() body){
    try{
      let {searchString} = body
      return this.quanLyNguoiDungService.timKiemNguoiDung(searchString);
    }catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("TimKiemNguoiDungPhanTrang")
  @ApiBody({
    type:searchStringPageDto
  })
  timKiemNguoiDungPhanTrang(@Body() body){
    try{
      let {searchString, currentPage, pageItem} = body
      return this.quanLyNguoiDungService.timKiemNguoiDungPhanTrang(searchString, currentPage, pageItem);
    }catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("CapNhatThongTinNguoiDung")
  @ApiBody({type: capNhatUserDto})
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  capNhatThongTinNguoiDung(@Body() body, @Req() req){
    try{
      let {matKhau, soDt, hoTen, email} = body
      let id = req.user.data.userId
      return this.quanLyNguoiDungService.capNhatThongTinNguoiDung(matKhau, soDt, hoTen, id);
    }catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete("XoaNguoiDung")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  xoaNguoiDung(@Req() req){
    try{
      let id = req.user.data.userId;
      return this.quanLyNguoiDungService.xoaNguoiDung(id)

    }catch (exception) {
      if (exception.status != 500) {
        throw new HttpException(exception.response, exception.status);
      }
      throw new HttpException("Lỗi....", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
}
