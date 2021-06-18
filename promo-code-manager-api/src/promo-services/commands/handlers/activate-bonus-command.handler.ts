import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IBonusActivationStatus } from '../../../promo-services/models/bonus-activation-status.interface';
import { BonusActivationStatusResponse } from '../../../promo-services/models/bonus-activation-status.response';
import { PromoServiceService } from '../../../promo-services/services/promo-service.service';
import { ActivateBonusCommand } from '../activate-bonus.command';

/**
 * 
 */
@CommandHandler(ActivateBonusCommand)
export class ActivateBonusCommandHandler implements ICommandHandler<ActivateBonusCommand> {
    /**
     * 
     * @param service 
     */
    constructor(
        private readonly service: PromoServiceService) {
    }

    /**
     * 
     * @param command 
     * @returns 
     */
    public async execute(command: ActivateBonusCommand): Promise<BonusActivationStatusResponse> {
        Logger.log('Async ActivateBonusCommandHandler...', 'ActivateBonusCommand');
        const response: IBonusActivationStatus = await this.service.activatePromoBonusAsync(command.request);
        if (!response.success) {
            throw new HttpException(response.message, HttpStatus.BAD_REQUEST);
        }
        return response;
    }
}