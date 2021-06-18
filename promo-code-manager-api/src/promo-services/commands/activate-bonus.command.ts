import { ICommand } from "@nestjs/cqrs";
import { ActivateBonusRequest } from "../models/activate-bonus.request";

/**
 * 
 */
export class ActivateBonusCommand implements ICommand {
    /**
     * 
     * @param request 
     */
    constructor(
        public readonly request: ActivateBonusRequest) {
    }
}