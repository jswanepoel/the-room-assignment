import { ApiProperty } from '@nestjs/swagger';

import { UserBonusResponse } from '../../user-bonuses/models/user-bonus.response';

/**
 * 
 */
export class PromoServiceResponse {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public description: string;

    @ApiProperty()
    public promoCode: string;

    @ApiProperty()
    public bonus: UserBonusResponse;
}