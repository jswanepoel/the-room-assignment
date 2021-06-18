import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { UserEntity } from '../enities/user.entity';
import { UserLoginRequest } from '../models/user-login.request';
import { UserResponse } from '../models/user.response';
import { validate } from '../validations/password.validation';
import { RegisterUserRequest } from '../models/register-user.request';
import { JwtPayload } from '../../auth/models/jwt-payload.interface';

/**
 * 
 */
@Injectable()
export class UsersService {
    /**
     * 
     * @param repository 
     */
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>) {
    }

    /**
     * 
     * @param options 
     * @returns 
     */
    public async findOneAsync(options?: FindOneOptions<UserEntity>): Promise<UserResponse> {
        const entity = await this.repository.findOne(options);
        return plainToClass(UserResponse, entity);
    }

    /**
     * 
     * @param param0 
     * @returns 
     */
    public async findByLoginAsync({ username, password }: UserLoginRequest): Promise<UserResponse> {
        const where = { username };
        const entity = await this.repository.findOne({ where });

        if (!entity) {
            throw new HttpException('User do not exist!', HttpStatus.UNAUTHORIZED);
        }

        const isValid: boolean = await validate(entity.password, password);

        if (!isValid) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return plainToClass(UserResponse, entity);
    }

    /**
     * 
     * @param param0 
     * @returns 
     */
    public async findByPayloadAsync({ username }: JwtPayload): Promise<UserResponse> {
        const where = { username };
        return await this.findOneAsync({ where });
    }

    /**
     * 
     * @param request 
     * @returns 
     */
    public async createAsync(request: RegisterUserRequest): Promise<UserResponse> {
        const { username, password, email } = request;

        const where = { username };
        const exist = await this.repository.findOne({ where });
        if (exist) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const entity: UserEntity = this.repository.create({ username, password, email, });
        await this.repository.save(entity);
        return plainToClass(UserResponse, entity);
    }
}