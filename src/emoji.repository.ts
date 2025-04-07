import { Repository } from "typeorm";
import { IconEntity } from "./icon.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { IconDto } from "./icon.dto";

/**
 * Repository for managing emoji data.
 * @date 2025-04-07
 * @author Patouillard Franck<patouillardfranck3@gmail.com>
 * @class IconRepository
 * @extends {Repository<IconEntity>}
 * @version 1.0.0
 */
export class IconRepository extends Repository<IconEntity> {
    constructor(@InjectRepository(IconEntity) private readonly iconRepository: Repository<IconEntity>) {
        super(iconRepository.target, iconRepository.manager, iconRepository.queryRunner);
    }

    /**
     * Verifies if the emoji data is valid.
     * @date 2025-04-07
     * @author Patouillard Franck<patouillardfranck3@gmail.com>
     * @param data - The data object containing applicant and recipient properties.
     * @returns {Promise<IconEntity | null>} - Returns the found emoji entity or null if not found.
     * @version 1.0.0
     */
    async isGoodEmoji(data: IconDto): Promise<IconEntity | null> {
        if(data) {
            return this.iconRepository.findOneBy({ name: data.name });
        }
    }
}