import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';

import { IRequestFlash } from './models/request-flash.interface';

@Catch(HttpException)
/**
 * 
 */
export class AuthExceptionFilter implements ExceptionFilter {
    /**
     * 
     * @param exception 
     * @param host 
     */
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<IRequestFlash>();

        if (exception instanceof UnauthorizedException ||
            exception instanceof ForbiddenException) {
            //request.flash('loginError', 'Please try again!');
            response.redirect('/');
        } else {
            response.redirect('/error');
        }
    }
}