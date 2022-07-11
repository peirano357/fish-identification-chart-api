"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionsRepository = void 0;
const typeorm_1 = require("typeorm");
const region_entity_1 = require("./region.entity");
const common_1 = require("@nestjs/common");
let RegionsRepository = class RegionsRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('RegionsRepository');
    }
    async createRegion(createRegionDto) {
        const { name, description, imageUrl } = createRegionDto;
        const region = this.create({
            name,
            description,
            imageUrl,
        });
        await this.save(region);
        return region;
    }
    async getRegions(filterDto) {
        const { search } = filterDto;
        const query = this.createQueryBuilder('region');
        if (search) {
            query.andWhere('(LOWER(region.name) LIKE LOWER(:search) OR LOWER(region.description) LIKE LOWER(:search))', { search: `%${search}%` });
        }
        try {
            const regions = await query.getMany();
            return regions;
        }
        catch (error) {
            this.logger.error(`Failed to get regions. Filters: ${JSON.stringify(filterDto)} `, error.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
};
RegionsRepository = __decorate([
    (0, typeorm_1.EntityRepository)(region_entity_1.Region)
], RegionsRepository);
exports.RegionsRepository = RegionsRepository;
//# sourceMappingURL=regions.repository.js.map