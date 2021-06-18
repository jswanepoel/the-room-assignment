import { Body, Controller, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthExceptionFilter } from '../../auth/filters/auth-exceptions.filter';
import { ActivateBonusCommand } from '../commands/activate-bonus.command';
import { ActivateBonusRequest } from '../models/activate-bonus.request';
import { BonusActivationStatusResponse } from '../models/bonus-activation-status.response';
import { PromoServiceByNameRequest } from '../models/promo-service-by-name.request';
import { PromoServicePageResponse } from "../models/promo-service-page.response";
import { PromoServiceByNameQuery } from '../queries/promo-service-by-name.query';

/**
 * 
 */
@Controller('promos')
@ApiTags('promos')
// @UseFilters(AuthExceptionFilter)
export class PromoServicesController {
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
    @Post()
    @UseGuards(AuthGuard())
    @ApiBody({ type: PromoServiceByNameRequest })
    @ApiOperation({ summary: 'Find promo services by name' })
    @ApiResponse({ type: PromoServicePageResponse })
    public async findByNameAsync(@Body() request: PromoServiceByNameRequest): Promise<PromoServicePageResponse> {
        return await this.queryBus.execute(new PromoServiceByNameQuery(request));
    }

    /**
     * 
     * @param request 
     * @returns 
     */
    @Put()
    @UseGuards(AuthGuard())
    @ApiBody({ type: ActivateBonusRequest })
    @ApiOperation({ summary: 'Activate user bonus' })
    @ApiResponse({ type: BonusActivationStatusResponse })
    public async activatePromoBonusAsync(@Body() request: ActivateBonusRequest): Promise<BonusActivationStatusResponse> {
        return await this.commandBus.execute(new ActivateBonusCommand(request));
    }
}