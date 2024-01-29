import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class QuanLyDatVeService {
    prisma = new PrismaClient()
    async layDanhSachPhongVe(maLichChieu){
        const data = await this.prisma.lichChieu.findMany({
            where: {
              ma_lich_chieu: +maLichChieu,
            },
          });
        console.log(data)
        return data
    }

    async taoLichChieu(maPhim, ngayChieuGioChieu, maRap, giaVe ){
      const result = await this.prisma.lichChieu.create({
        data: {
          ma_phim: maPhim,
          ma_rap:maRap,
          ngay_gio_chieu: ngayChieuGioChieu,
          gia_ve:giaVe
        },
      });

      return result
    }

    async datVe(id, maLichChieu, maGhe){
      const data = await this.prisma.datVe.create({
        data:{
          tai_khoan:id,
          ma_lich_chieu:maLichChieu,
          ma_ghe:maGhe
        }
      })
      return data
    }
}
