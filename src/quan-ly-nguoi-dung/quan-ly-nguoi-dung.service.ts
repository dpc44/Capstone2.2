import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class QuanLyNguoiDungService {
  prisma = new PrismaClient()
  constructor(private jwtService: JwtService) {

  }
  async layDanhSachNguoiDung() {
    return await this.prisma.nguoiDung.findMany()
  }

  async layDanhSachNguoiDungPhanTrang(currentPage, pageItem) {
    let index = (currentPage - 1) * pageItem;
    let totalPage = await this.prisma.nguoiDung.count();
    totalPage = Math.ceil(totalPage / pageItem);
    let data = await this.prisma.nguoiDung.findMany({
      skip: index,
      take: pageItem,
    })
    return data
  }

  async dangKy(matKhau, email, soDt, hoTen, loaiNguoiDung) {
    const checkUser = await this.prisma.nguoiDung.findUnique({ where: { email: email } });
    if (checkUser) {
      throw new HttpException('Existed email', HttpStatus.UNAUTHORIZED);
    }
    var encryptPassword = await bcrypt.hash(matKhau, 10);
    const result = await this.prisma.nguoiDung.create({
      data: {
        mat_khau: encryptPassword,
        email: email,
        so_dt: soDt,
        ho_ten: hoTen,
        loai_nguoi_dung: loaiNguoiDung
      },
    });

    return result
  }


  async login(email, matKhau) {
    const checkUser = await this.prisma.nguoiDung.findUnique({ where: { email: email } });
    if (!checkUser) {
      throw new HttpException('Invalid email', HttpStatus.UNAUTHORIZED);
    }
    const isPasswordValid = bcrypt.compareSync(matKhau, checkUser.mat_khau);

    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.jwtService.signAsync(
      { data: { userId: checkUser.tai_khoan } },
      { expiresIn: '10d', secret: "BI_MAT" },
    );

    return token;

  }

  async timKiemNguoiDung(searchString) {
    const data = await this.prisma.nguoiDung.findMany({ where: { ho_ten: { contains: searchString } } });
    return data
  }

  async timKiemNguoiDungPhanTrang(searchString, currentPage, pageItem) {
    let index = (currentPage - 1) * pageItem;
    let totalPage = await this.prisma.nguoiDung.count({
      where: { ho_ten: { contains: searchString } },
    });
    totalPage = Math.ceil(totalPage / pageItem);

    const data = await this.prisma.nguoiDung.findMany({
      where: { ho_ten: { contains: searchString } },
      skip: index,
      take: pageItem,
    });
    return data
  }

  async capNhatThongTinNguoiDung(matKhau, soDt, hoTen, id) {
    let getUser = await this.prisma.nguoiDung.findUnique({ where: { tai_khoan: id } });
    if (!getUser) {
      throw new HttpException('Invalid email', HttpStatus.UNAUTHORIZED);
    }
    const updatedData: Record<string, any> = {};
    if (matKhau) {
      var encryptPassword = await bcrypt.hash(matKhau, 10);
      updatedData.mat_khau = encryptPassword
    }
    if (soDt) {
      updatedData.so_dt = soDt;
    }
    if (hoTen) {
      updatedData.ho_ten = hoTen;
    }

    await this.prisma.nguoiDung.update({
      data: updatedData,
      where: { tai_khoan: id },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'User information updated successfully',
    };
  }

  async xoaNguoiDung(id) {
    const checkResult = await this.prisma.nguoiDung.delete({ where: { tai_khoan: id } })
    if (checkResult) {
      return {
        statusCode: HttpStatus.OK,
        message: 'User information deleted successfully',
      };
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
