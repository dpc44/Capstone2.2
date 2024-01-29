import { ApiProperty } from "@nestjs/swagger";

export class dangKyDto {
    @ApiProperty()
    matKhau:string
    @ApiProperty()
    email:string
    @ApiProperty()
    soDt:string
    @ApiProperty()
    loaiNguoiDung:String
    @ApiProperty()
    hoTen:String
    
} 