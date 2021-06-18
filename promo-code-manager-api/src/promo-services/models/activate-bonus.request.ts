import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

/**
 * 
 */
export class ActivateBonusRequest {
    @IsNotEmpty()
    @ApiProperty()
    public readonly username: string;

    @IsNotEmpty()
    @ApiProperty()
    public readonly id: string;
}