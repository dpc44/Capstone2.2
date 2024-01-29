import { ApiProperty } from "@nestjs/swagger";

export class taoLichChieuDto {
    @ApiProperty()
    maPhim:number
    @ApiProperty()
    ngayChieuGioChieu:Date
    @ApiProperty()
    maRap:number
    @ApiProperty()
    giaVe:number

} 

