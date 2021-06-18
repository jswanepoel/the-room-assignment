import { ICommand } from '@nestjs/cqrs';
import { RegisterUserRequest } from '../../users/models/register-user.request';

/**
 * 
 */
export class RegisterUserCommand implements ICommand {
    /**
     * 
     * @param request 
     */
    constructor(
        public readonly request: RegisterUserRequest) {
    }
}