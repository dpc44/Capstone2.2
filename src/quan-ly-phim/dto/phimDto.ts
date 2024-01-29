import { ApiProperty } from "@nestjs/swagger";

export class createPhimDto {
    @ApiProperty({ type: 'string', format: 'binary'})
    avatar:any
    @ApiProperty({ type: String, format: 'date', default: new Date().toISOString().split('T')[0]  })
    ngayKhoiChieu: string = new Date().toISOString().split('T')[0] ;
    @ApiProperty()
    tenPhim:string
    @ApiProperty()
    trailer:string
    @ApiProperty()
    moTa:string
    @ApiProperty()
    danhGia:number
    @ApiProperty()
    hot:string
    @ApiProperty()
    dangChieu:string
    @ApiProperty()
    sapChieu:string

}