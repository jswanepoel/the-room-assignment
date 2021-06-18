import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserLoginRequest } from '../../users/models/user-login.request';
import { RegisterUserRequest } from '../../users/models/register-user.request';
import { JwtPayload } from '../models/jwt-payload.interface';
import { ILoginStatus } from '../models/login-status.interface';
import { IRegistrationStatus } from '../models/registration-status.interface';

import { UserResponse } from '../../users/models/user.response';
import { UsersService } from '../../users/services/users.service';

@Injectable()
/**
 * 
 */
export class AuthService {
    /**
     * 
     * @param usersService 
     * @param jwtService 
     */
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService) {
    }

    /**
     * 
     * @param request 
     * @returns 
     */
    public async registerAsync(request: RegisterUserRequest): Promise<IRegistrationStatus> {
        let status: IRegistrationStatus = {
            success: true,
            message: 'user registered',
        };

        try {
            await this.usersService.createAsync(request);
        } catch (error: any) {
            status = {
                success: !status.success,
                message: error,
            };
        }
        return status;
    }

    /**
     * 
     * @param request 
     * @returns 
     */
    public async loginAsync(request: UserLoginRequest): Promise<ILoginStatus> {
        const response = await this.usersService.findByLoginAsync(request);
        const token = this.generateToken(response);

        return {
            username: response.username,
            ...token,
        };
    }

    /**
     * 
     * @param payload 
     * @returns 
     */
    public async validateUserAync(payload: JwtPayload): Promise<UserResponse> {
        const response = await this.usersService.findByPayloadAsync(payload);
        if (!response) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return response;
    }

    /**
     * 
     * @param param0 
     * @returns 
     */
    private generateToken({ username }: UserResponse): any {
        const expiresIn = 360;
        const user: JwtPayload = { username };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn,
            accessToken,
        };
    }
}