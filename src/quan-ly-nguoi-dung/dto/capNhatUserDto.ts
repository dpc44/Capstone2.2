import { ApiProperty } from "@nestjs/swagger";

export class capNhatUserDto {
    @ApiProperty()
    matKhau:string
    @ApiProperty()
    soDt:string
    @ApiProperty()
    hoTen:String
} 