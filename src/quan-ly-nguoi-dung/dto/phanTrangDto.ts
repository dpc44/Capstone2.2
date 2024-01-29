import { ApiProperty } from '@nestjs/swagger';

export class phanTrangDto {
  @ApiProperty({ default: 1 })
  currentPage: number;
  @ApiProperty({ default: 1 })
  pageItem: number;
}