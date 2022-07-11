"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrittersRegionsRepository = void 0;
const typeorm_1 = require("typeorm");
const critter_region_entity_1 = require("./critter-region.entity");
const common_1 = require("@nestjs/common");
let CrittersRegionsRepository = class CrittersRegionsRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('CrittersRegionsRepository');
    }
    async createCritterRegion(createCritterRegionDto) {
        const { critterId, regionId, sort } = createCritterRegionDto;
        const critterregion = this.create({
            critterId: critterId,
            regionId: regionId,
            sort: sort,
        });
        await this.save(critterregion);
        return critterregion;
    }
    async getCrittersInRegion(regionId) {
        const query = this.createQueryBuilder('critter-region');
        if (regionId) {
            query.where({ regionId: regionId });
        }
        try {
            const crittersRegion = await query.getMany();
            return crittersRegion;
        }
        catch (error) {
            this.logger.error(`Failed to get critters by region. Filters: ${JSON.stringify(regionId)} `, error.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
};
CrittersRegionsRepository = __decorate([
    (0, typeorm_1.EntityRepository)(critter_region_entity_1.CritterRegion)
], CrittersRegionsRepository);
exports.CrittersRegionsRepository = CrittersRegionsRepository;
//# sourceMappingURL=critters-regions.repository.js.map