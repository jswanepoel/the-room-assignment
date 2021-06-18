import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

/**
 * 
 */
export class UserLoginRequest {
    @IsNotEmpty()
    @ApiProperty()
    public readonly username: string;
    
    @IsNotEmpty()
    @ApiProperty()
    public readonly password: string;    
}
