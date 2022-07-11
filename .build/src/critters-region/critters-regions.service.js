"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrittersRegionsService = void 0;
const common_1 = require("@nestjs/common");
const critters_regions_repository_1 = require("./critters-regions.repository");
const typeorm_1 = require("@nestjs/typeorm");
const user_type_enum_1 = require("../auth/enum/user-type.enum");
const critters_repository_1 = require("../critters/critters.repository");
const regions_repository_1 = require("../regions/regions.repository");
const typeorm_2 = require("typeorm");
let CrittersRegionsService = class CrittersRegionsService {
    constructor(regionsRepository, crittersRepository, crittersRegionRepository) {
        this.regionsRepository = regionsRepository;
        this.crittersRepository = crittersRepository;
        this.crittersRegionRepository = crittersRegionRepository;
    }
    async getCrittersInRegion(regionId) {
        const crittersRegion = await this.crittersRegionRepository.getCrittersInRegion(regionId);
        const ids = [];
        await Promise.all(crittersRegion.map(async (cr) => {
            ids.push(cr.critterId);
        }));
        return await this.crittersRepository.find({
            where: {
                id: (0, typeorm_2.In)(ids),
            },
        });
    }
    async isCritterInRegions(critterId, regionId) {
        const founds = await this.crittersRegionRepository.find({
            where: {
                regionId: (0, typeorm_2.In)(regionId),
                critterId: critterId,
            },
        });
        if (founds.length > 0) {
            return true;
        }
        return false;
    }
    async getCritterRegionByIds(critterId, regionId) {
        const found = await this.crittersRegionRepository.findOne({
            where: { critterId, regionId },
        });
        if (!found) {
            throw new common_1.NotFoundException(`Element with ID "${critterId}" not found`);
        }
        return found;
    }
    async deleteCritterRegion(critterId, regionId, user) {
        if (user.userType == user_type_enum_1.UserTypeEnum.administrator) {
            const result = await this.crittersRegionRepository.delete({
                critterId,
                regionId,
            });
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Critter with ID "${critterId}" not found in region with ID "${regionId}" `);
            }
        }
        else {
            throw new common_1.UnauthorizedException('Only administrators can perform this task.');
        }
    }
    async updateCritterRegion(id, critterId, regionId, sort, user) {
        const critterRegion = await this.getCritterRegionByIds(critterId, regionId);
        critterRegion.sort = sort;
        if (user.userType == user_type_enum_1.UserTypeEnum.administrator) {
            const exists = this.crittersRegionRepository.findOne({
                where: {
                    critterId: critterId,
                    regionId: regionId,
                },
            });
            if (!exists) {
                throw new common_1.NotFoundException(`Element with IDs "${critterId}" and "${regionId}" not found`);
            }
            await this.crittersRegionRepository.save(critterRegion);
            return critterRegion;
        }
        else {
            throw new common_1.UnauthorizedException('Only administrators can perform this task.');
        }
    }
    async createCritterRegion(createCritterRegionDto, user) {
        if (user.userType == user_type_enum_1.UserTypeEnum.administrator) {
            const regionExists = await this.regionsRepository.findOne({
                where: { id: createCritterRegionDto.regionId },
            });
            if (!regionExists) {
                throw new common_1.NotFoundException(`Region with ID "${createCritterRegionDto.regionId}" not found`);
            }
            const critterExists = await this.crittersRepository.findOne({
                where: { id: createCritterRegionDto.critterId },
            });
            if (!critterExists) {
                throw new common_1.NotFoundException(`Critter with ID "${createCritterRegionDto.critterId}" not found`);
            }
            return this.crittersRegionRepository.createCritterRegion(createCritterRegionDto);
        }
        else {
            throw new common_1.UnauthorizedException('Only administrators can perform this task.');
        }
    }
};
CrittersRegionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(regions_repository_1.RegionsRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(critters_repository_1.CrittersRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(critters_regions_repository_1.CrittersRegionsRepository)),
    __metadata("design:paramtypes", [regions_repository_1.RegionsRepository,
        critters_repository_1.CrittersRepository,
        critters_regions_repository_1.CrittersRegionsRepository])
], CrittersRegionsService);
exports.CrittersRegionsService = CrittersRegionsService;
//# sourceMappingURL=critters-regions.service.js.map