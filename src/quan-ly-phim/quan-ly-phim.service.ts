import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { createPhimDto } from './dto/phimDto';

@Injectable()
export class QuanLyPhimService {
    prisma = new PrismaClient()
    constructor(private jwtService: JwtService) {

    }
    async layDanhSachBanner() {
        return await this.prisma.banner.findMany();
    }

    async layDanhSachPhim() {
        return await this.prisma.phim.findMany();
    }
    async layDanhSachPhimPhanTrang(currentPage, pageItem) {
        let index = (currentPage - 1) * pageItem;
        let totalPage = await this.prisma.phim.count();
        totalPage = Math.ceil(totalPage / pageItem);
        let data = await this.prisma.phim.findMany({
            skip: index,
            take: pageItem,
        })

        return data
    }

    async layDanhSachPhimPhanTrangNgay(currentPage, pageItem, endDate, startDate) {
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);
        let index = (currentPage - 1) * pageItem;
        let totalPage = await this.prisma.phim.count({
            where: {
                ngay_khoi_chieu: {
                    gte: parsedStartDate,
                    lte: parsedEndDate,
                },
            }
        });
        totalPage = Math.ceil(totalPage / pageItem);
        let data = await this.prisma.phim.findMany({
            where: {
                ngay_khoi_chieu: {
                    gte: parsedStartDate,
                    lte: parsedEndDate,
                },
            },
            skip: index,
            take: pageItem,
        })

        return data
    }

    async timKiemMaPhim(maPhim) {
        const data = await this.prisma.phim.findMany({ where: { ma_phim: maPhim } });
        return data
    }


    async capNhatHinhPhim(fileImage, maPhim) {
        let maPhimNumber = +maPhim
        let originalData = await this.prisma.phim.findUnique({ where: { ma_phim: maPhimNumber } });
        const updatedData: Record<string, any> = {};
        if (!originalData) {
            throw new HttpException('ma_phim not found', HttpStatus.UNAUTHORIZED);
        }
        if (fileImage) {
            updatedData.hinh_anh = fileImage
        }

        await this.prisma.phim.update({
            data: updatedData,
            where: { ma_phim: maPhimNumber },
        });

        return {
            statusCode: HttpStatus.OK,
            message: 'Image updated successfully',
        };

    }

    async createPhim(avatar: any, createPhimDto: createPhimDto) {
        const { ngayKhoiChieu, tenPhim, trailer, moTa, danhGia, hot, dangChieu, sapChieu } = createPhimDto;
        const ngayKhoiChieuDate = new Date(ngayKhoiChieu);
        const createdPhim = await this.prisma.phim.create({
            data: {
                hinh_anh: avatar ? avatar.filename : null,
                ngay_khoi_chieu: ngayKhoiChieuDate,
                ten_phim: tenPhim,
                trailer,
                mo_ta: moTa,
                danh_gia: +danhGia,
                hot: hot.toLowerCase() === "true" ? true : false,
                dang_chieu: dangChieu.toLowerCase() === "true" ? true : false,
                sap_chieu: sapChieu.toLowerCase() === "true" ? true : false,
            },
        });
        return createdPhim;
    }

    async xoaPhim(maPhim: number) {
        
        const checkResult = await this.prisma.phim.delete({
            where: { ma_phim: +maPhim },
        });

        if (!checkResult) {
            throw new HttpException('Movie ID Not Found', HttpStatus.NOT_FOUND);
        }

        return {
            statusCode: HttpStatus.OK,
            message: 'Movie deleted successfully',
        };

    }
}
