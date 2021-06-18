import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserResponse } from '../../users/models/user.response';
import { JwtPayload } from '../models/jwt-payload.interface';
import { AuthService } from '../services/auth.service';

@Injectable()
/**
 * 
 */
export class JwtStrategy extends PassportStrategy(Strategy) {
    /**
     * 
     * @param authService 
     */
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '@Nn_3-]I)K]H*w^>k5_BRJF/FfZ@+9jkWQ`E?eBQ])^.05-v&Gk/Wj-d[24QvNA'//process.env.SECRETKEY,
        });
    }

    /**
     * 
     * @param payload 
     * @returns 
     */
    public async validate(payload: JwtPayload): Promise<UserResponse> {
        const entity = await this.authService.validateUserAync(payload);
        if (!entity) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return entity;
    }
}