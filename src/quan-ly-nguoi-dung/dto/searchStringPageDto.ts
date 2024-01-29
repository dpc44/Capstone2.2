import { ApiProperty } from '@nestjs/swagger';

export class searchStringPageDto {
  @ApiProperty()
  searchString: string;
  @ApiProperty({ default: 1 })
  currentPage: number;
  @ApiProperty({ default: 1 })
  pageItem: number;
}