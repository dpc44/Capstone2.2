import { ApiProperty } from "@nestjs/swagger";

export class uploadDto {
    @ApiProperty({ type: 'string', format: 'binary'})
    avatar:any

    @ApiProperty()
    maPhim:string
}