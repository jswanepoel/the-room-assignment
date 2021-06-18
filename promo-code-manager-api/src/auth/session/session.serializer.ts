import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
/**
 * 
 */
export class SessionSerializer extends PassportSerializer {
    /**
     * 
     * @param user 
     * @param done 
     */
    serializeUser(user: any, done: (err: Error, user: any) => void): any {
        done(null, user);
    }

    /**
     * 
     * @param payload 
     * @param done 
     */
    deserializeUser(
        payload: any,
        done: (err: Error, payload: string) => void,
    ): any {
        done(null, payload);
    }
}