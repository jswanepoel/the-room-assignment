import { IQuery } from '@nestjs/cqrs';

import { UserLoginRequest } from '../../users/models/user-login.request';

/**
 * 
 */
export class UserLoginQuery implements IQuery {
    /**
     * 
     * @param request 
     */
    constructor(
        public readonly request: UserLoginRequest) {
    }
}