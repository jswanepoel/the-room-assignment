import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * 
 */
export class UserResponse {
    @IsNotEmpty()
    @ApiProperty()
    public id: string;
    
    @IsNotEmpty()
    @ApiProperty()  
    public username: string;
    
    @IsNotEmpty()  
    @IsEmail()
    @ApiProperty()
    public email: string;
}