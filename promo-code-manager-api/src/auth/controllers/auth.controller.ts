import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserLoginRequest } from '../../users/models/user-login.request';
import { RegisterUserRequest } from '../../users/models/register-user.request';
import { LoginStatusResponse } from '../models/login-status.response';
import { RegistrationStatusResponse } from '../models/registration-status.response';
import { RegisterUserCommand } from '../commands/register-user.command';
import { UserLoginQuery } from '../queries/user-login.query';

@Controller('auth')
@ApiTags('auth')
/**
 * 
 */
export class AuthController {
    /**
     * 
     * @param commandBus 
     * @param queryBus 
     */
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus) {
    }

    /**
     * 
     * @param request 
     * @returns 
     */
    @Post('signup')
    @ApiBody({ type: RegisterUserRequest })
    @ApiOperation({ summary: 'User signup' })
    @ApiResponse({ type: RegistrationStatusResponse })
    public async registerAsync(@Body() request: RegisterUserRequest): Promise<RegistrationStatusResponse> {
        return await this.commandBus.execute(new RegisterUserCommand(request));
    }

    /**
     * 
     * @param request 
     * @returns 
     */
    @Post('signin')
    @ApiBody({ type: UserLoginRequest })
    @ApiOperation({ summary: 'User signin' })
    @ApiResponse({ type: LoginStatusResponse })
    public async singInAsync(@Body() request: UserLoginRequest): Promise<LoginStatusResponse> {
        return await this.queryBus.execute(new UserLoginQuery(request));
    }
}