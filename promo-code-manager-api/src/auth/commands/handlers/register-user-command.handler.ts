import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IRegistrationStatus } from '../../../auth/models/registration-status.interface';
import { RegistrationStatusResponse } from '../../../auth/models/registration-status.response';
import { AuthService } from '../../../auth/services/auth.service';
import { RegisterUserCommand } from '../register-user.command';

/**
 * 
 */
@CommandHandler(RegisterUserCommand)
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand> {
    /**
     * 
     * @param authService 
     */
    constructor(
        private readonly authService: AuthService) {
    }

    /**
     * 
     * @param command 
     * @returns 
     */
    public async execute(command: RegisterUserCommand): Promise<RegistrationStatusResponse> {
        Logger.log('Async RegisterUserCommandHandler...', 'RegisterUserCommand');
        const response: IRegistrationStatus = await this.authService.registerAsync(command.request);
        if (!response.success) {
            throw new HttpException(response.message, HttpStatus.BAD_REQUEST);
        }
        return response;
    }
}