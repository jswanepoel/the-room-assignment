import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { isEmpty } from 'class-validator';
import { paginate, paginateRaw } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { UserBonusEntity } from '../../user-bonuses/entities/user-bonus.entity';
import { UserEntity } from '../../users/enities/user.entity';
import { PromoServiceEntity } from '../entities/promo-service.entity';
import { ActivateBonusRequest } from '../models/activate-bonus.request';
import { IBonusActivationStatus } from '../models/bonus-activation-status.interface';
import { BonusActivationStatusResponse } from '../models/bonus-activation-status.response';
import { PromoServiceByNameRequest } from '../models/promo-service-by-name.request';
import { PromoServiceResponse } from '../models/promo-service.response';
import { PromoServicePageResponse } from "../models/promo-service-page.response";

/**
 * 
 */
@Injectable()
export class PromoServiceService {
    /**
     * 
     * @param repository 
     * @param userRepository 
     * @param bonusRepository 
     */
    constructor(
        @InjectRepository(PromoServiceEntity)
        private readonly repository: Repository<PromoServiceEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(UserBonusEntity)
        private readonly bonusRepository: Repository<UserBonusEntity>) {
    }

    /**
     * 
     * @param param0 
     * @returns 
     */
    public async findByNameAsync(request: PromoServiceByNameRequest): Promise<PromoServicePageResponse> {
        let query = this.repository
            .createQueryBuilder('promo_service')
            .orderBy('promo_service.name', 'ASC');


        if (!isEmpty(request.name)) {
            query = query.where('promo_service.name like :search ', { search: `%${request.name}%` });
        }
        const userId = await this.getUserIdAsync(request.username);
        query = query
            .leftJoinAndSelect('promo_service.bonus', 'bonus', 'bonus.user.id = :id', { id: userId })
            .leftJoinAndSelect('bonus.user', 'user', 'user.id = :id', { id: userId })
            .orderBy('user.username', 'DESC');

        const entity = await query.getMany();
        const page = request.page;
        const limit = request.pageSize;
        const promoEntity = await paginate(query, { page, limit });
        const response = new PromoServicePageResponse();
        response.promoServices = promoEntity.items;
        response.metaData = promoEntity.meta;

        if (!entity) {
            throw new HttpException('No service by this name could be found!', HttpStatus.EXPECTATION_FAILED);
        }

        return response;
    }

    /**
     * 
     * @param param0 
     * @returns 
     */
    public async activatePromoBonusAsync({ username, id }: ActivateBonusRequest): Promise<BonusActivationStatusResponse> {
        let status: IBonusActivationStatus = {
            success: true,
            message: 'user bonus activated',
        };

        const promoService = await this.repository.findOne({ id: id });
        const user = await this.userRepository.findOne({ username: username });
        const bonus = this.bonusRepository.create();

        promoService.bonus = bonus;
        promoService.bonus.user = user;

        const response = await this.repository.save(promoService);

        if (!response) {
            status = {
                success: !status.success,
                message: 'user bonus not activated',
            };
        }
        return status;
    }

    /**
     * 
     * @param username 
     * @returns 
     */
    private async getUserIdAsync(username: string): Promise<string> {
        const user = await this.userRepository.findOne({ username: username });
        return user.id;
    }
}