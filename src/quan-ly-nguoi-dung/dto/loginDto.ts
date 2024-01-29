import { ApiProperty } from "@nestjs/swagger";

export class loginDto {
    @ApiProperty()
    matKhau:string
    @ApiProperty()
    email:string    
} 