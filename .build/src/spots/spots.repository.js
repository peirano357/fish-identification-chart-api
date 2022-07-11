"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotsRepository = void 0;
const typeorm_1 = require("typeorm");
const spot_entity_1 = require("./spot.entity");
const common_1 = require("@nestjs/common");
let SpotsRepository = class SpotsRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('SpotsRepository');
    }
    async createSpot(createSpotDto) {
        const { userId, critterId, latitude, longitude } = createSpotDto;
        const spot = this.create({
            userId: userId,
            critterId: critterId,
            spottedDate: new Date(),
            latitude: latitude,
            longitude: longitude,
        });
        await this.save(spot);
        return spot;
    }
    async getSpotsByUser(userId) {
        const query = this.createQueryBuilder('spot');
        if (userId) {
            query.where({ userId: userId });
        }
        try {
            const spots = await query.getMany();
            return spots;
        }
        catch (error) {
            this.logger.error(`Failed to get spots for user. Filters: ${JSON.stringify(userId)} `, error.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
};
SpotsRepository = __decorate([
    (0, typeorm_1.EntityRepository)(spot_entity_1.Spot)
], SpotsRepository);
exports.SpotsRepository = SpotsRepository;
//# sourceMappingURL=spots.repository.js.map