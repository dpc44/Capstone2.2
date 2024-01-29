import { ApiProperty } from '@nestjs/swagger';

export class timKiemMaPhimDto {
  @ApiProperty()
  maPhim: number;
}