import { ApiProperty } from '@nestjs/swagger';

export class searchStringDto {
  @ApiProperty()
  searchString: string;
}