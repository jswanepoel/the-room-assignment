import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, isNumber, IsString } from "class-validator";

/**
 * 
 */
export class PromoServiceByNameRequest {
    @IsString()
    @ApiProperty()
    public username: string;

    @IsString()
    @ApiProperty()
    public name: string;

    @IsNumber()
    @ApiProperty()
    public page: number;

    @IsNumber()
    @ApiProperty()
    public pageSize: number;
}