import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * 
 */
export class RegisterUserRequest {
    /**
     * 
     */
    @IsNotEmpty() 
    @IsString() 
    @ApiProperty()
    public readonly username!: string;
    
    @IsNotEmpty()
    @ApiProperty()  
    public readonly password: string;
    
    @IsNotEmpty()  
    @IsEmail() 
    @ApiProperty() 
    public readonly email: string;
}