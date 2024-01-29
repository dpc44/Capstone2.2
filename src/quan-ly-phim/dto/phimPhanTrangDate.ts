import { ApiProperty } from "@nestjs/swagger";


export class phimPhanTrangDate {
    @ApiProperty({ type: String, format: 'date', default: new Date().toISOString().split('T')[0]  })
    startDate: string = new Date().toISOString().split('T')[0] ;

    @ApiProperty({ type: String, format: 'date', default: new Date().toISOString().split('T')[0]  })
    endDate: string = new Date().toISOString().split('T')[0] ;

    @ApiProperty({ default: 1 })
    currentPage: number;
    @ApiProperty({ default: 1 })
    pageItem: number;
}