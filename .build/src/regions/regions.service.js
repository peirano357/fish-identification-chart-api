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
exports.RegionsService = void 0;
const common_1 = require("@nestjs/common");
const regions_repository_1 = require("./regions.repository");
const typeorm_1 = require("@nestjs/typeorm");
const user_type_enum_1 = require("../auth/enum/user-type.enum");
let RegionsService = class RegionsService {
    constructor(regionRepository) {
        this.regionRepository = regionRepository;
    }
    getRegions(filterDto) {
        return this.regionRepository.getRegions(filterDto);
    }
    async getRegionById(id) {
        const found = await this.regionRepository.findOne({ where: { id } });
        if (!found) {
            throw new common_1.NotFoundException(`Region with ID "${id}" not found`);
        }
        return found;
    }
    async deleteRegion(id, user) {
        if (user.userType == user_type_enum_1.UserTypeEnum.administrator) {
            const result = await this.regionRepository.delete({ id });
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Region with ID "${id}" not found`);
            }
        }
        else {
            throw new common_1.UnauthorizedException('Only administrators can perform this task.');
        }
    }
    async updateRegion(id, name, description, imageUrl, user) {
        const region = await this.getRegionById(id);
        region.name = name;
        region.description = description;
        region.imageUrl = imageUrl;
        if (user.userType == user_type_enum_1.UserTypeEnum.administrator) {
            await this.regionRepository.save(region);
            return region;
        }
        else {
            throw new common_1.UnauthorizedException('Only administrators can perform this task.');
        }
    }
    createRegion(createRegionDto, user) {
        if (user.userType == user_type_enum_1.UserTypeEnum.administrator) {
            return this.regionRepository.createRegion(createRegionDto);
        }
        else {
            throw new common_1.UnauthorizedException('Only administrators can perform this task.');
        }
    }
};
RegionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(regions_repository_1.RegionsRepository)),
    __metadata("design:paramtypes", [regions_repository_1.RegionsRepository])
], RegionsService);
exports.RegionsService = RegionsService;
//# sourceMappingURL=regions.service.js.map