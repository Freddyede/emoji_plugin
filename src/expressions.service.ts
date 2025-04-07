import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpressionsService {
    /**
     * Verifies if the applicant and recipient are valid for the emoji service.
     * @author Patouillard Franck<patouillardfranck3@gmail.com>
     * @date 2025-04-07
     * @param data - The data object containing applicant and recipient properties.
     * @returns {boolean} - Returns true if both applicant and recipient are valid, otherwise false.
     * @version 1.0.0
     */
    async verifyIfIsGoodApplicantAndRecipientToString(data) {
    return new RegExp(/DASHBOARD_QUEUE/i).test(data.applicant) && new RegExp(/CORE_QUEUE/i).test(data.recipient);
    }
}
