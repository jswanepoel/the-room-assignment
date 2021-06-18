import { ApiProperty } from '@nestjs/swagger';

import { ILoginStatus } from './login-status.interface';

/**
 * 
 */
export class LoginStatusResponse implements ILoginStatus {
    @ApiProperty()
    username: string;

    @ApiProperty()
    accessToken: any;

    @ApiProperty()
    expiresIn: any;
}