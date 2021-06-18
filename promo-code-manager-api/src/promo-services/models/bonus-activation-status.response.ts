import { ApiProperty } from '@nestjs/swagger';
import { IBonusActivationStatus } from './bonus-activation-status.interface';

/**
 * 
 */
export class BonusActivationStatusResponse implements IBonusActivationStatus {
    @ApiProperty()
    public success: boolean;

    @ApiProperty()
    public message: string;
}