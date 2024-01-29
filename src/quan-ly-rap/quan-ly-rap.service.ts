import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class QuanLyRapService {
    prisma = new PrismaClient()
    async layThongTinHeThongRap(maHeThongRap) {
        const data = await this.prisma.heThongRap.findUnique({
            where: {
                ma_he_thong_rap: +maHeThongRap
            }
        })

        return data
    }

    async LayThongTinCumRapTheoHeThong(maHeThongRap) {
        const data = await this.prisma.cumRap.findMany({
            where: {
                ma_he_thong_rap: +maHeThongRap, // Convert to a number
            },

        });

        return data
    }

    async layThongTinLichChieuHeThongRap(maHeThongRap) {

        const data = await this.prisma.heThongRap.findUnique({
            where: { ma_he_thong_rap: +maHeThongRap },
            include: {
                CumRap: {
                    select: {
                        RapPhim: {
                            select: {
                                LichChieu: {
                                    select: {
                                        ma_lich_chieu: true,
                                        ma_rap: true,
                                        ma_phim: true,
                                        ngay_gio_chieu: true,
                                        gia_ve: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return data
    }


    async layThongTinLichChieuPhim(maPhim){
        const data = await this.prisma.lichChieu.findMany({where:{ma_phim:+maPhim}});

        return data
    }
}
