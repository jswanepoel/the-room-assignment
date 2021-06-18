import { ApiProperty } from '@nestjs/swagger';
import { IRegistrationStatus } from './registration-status.interface';

/**
 * 
 */
export class RegistrationStatusResponse implements IRegistrationStatus {
    @ApiProperty()
    /**
     * 
     */
    public success: boolean;

    @ApiProperty()
    /**
     * 
     */
    public message: string;
}