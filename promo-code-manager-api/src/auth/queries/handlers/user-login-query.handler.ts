import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { LoginStatusResponse } from '../../../auth/models/login-status.response';
import { AuthService } from '../../../auth/services/auth.service';
import { UserLoginQuery } from '../user-login.query';

@QueryHandler(UserLoginQuery)
export class UserLoginQueryHandler implements IQueryHandler<UserLoginQuery> {
    constructor(
        private readonly authService: AuthService) {
    }
    
    public async execute(query: UserLoginQuery): Promise<LoginStatusResponse> {
        return await this.authService.loginAsync(query.request);
    }
}