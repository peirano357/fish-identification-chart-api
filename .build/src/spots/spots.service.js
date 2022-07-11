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
exports.SpotsService = void 0;
const common_1 = require("@nestjs/common");
const spots_repository_1 = require("./spots.repository");
const typeorm_1 = require("@nestjs/typeorm");
const users_repository_1 = require("../auth/users.repository");
const critters_repository_1 = require("../critters/critters.repository");
const typeorm_2 = require("typeorm");
const purchases_repository_1 = require("../purchases/purchases.repository");
const critters_regions_repository_1 = require("../critters-region/critters-regions.repository");
let SpotsService = class SpotsService {
    constructor(crittersRegionsRepository, crittersRepository, usersRepository, spotsRepository, purchasesRepository) {
        this.crittersRegionsRepository = crittersRegionsRepository;
        this.crittersRepository = crittersRepository;
        this.usersRepository = usersRepository;
        this.spotsRepository = spotsRepository;
        this.purchasesRepository = purchasesRepository;
    }
    async getSpotsByUser(userId) {
        const spots = await this.spotsRepository.getSpotsByUser(userId);
        const ids = [];
        await Promise.all(spots.map(async (p) => {
            ids.push(p.critterId);
        }));
        return await this.crittersRepository.find({
            where: {
                id: (0, typeorm_2.In)(ids),
            },
        });
    }
    async getSpotByIds(userId, critterId) {
        const found = await this.spotsRepository.findOne({
            where: { userId, critterId },
        });
        if (!found) {
            throw new common_1.NotFoundException(`Element with ID "${userId}, ${critterId} not found`);
        }
        return found;
    }
    async deleteSpot(critterId, user) {
        const result = await this.spotsRepository.delete({
            userId: user.id,
            critterId: critterId,
        });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Critter with ID "${critterId}" not found for current user. `);
        }
    }
    async updateSpot(id, critterId, spottedDate, latitude, longitude, user) {
        const spot = await this.getSpotByIds(user.id, critterId);
        spot.spottedDate = spottedDate;
        spot.longitude = longitude;
        spot.latitude = latitude;
        const exists = this.spotsRepository.findOne({
            where: {
                userId: user.id,
                critterId: critterId,
            },
        });
        if (!exists) {
            throw new common_1.NotFoundException(`Element with IDs "${user.id}" and "${critterId}" not found`);
        }
        await this.spotsRepository.save(spot);
        return spot;
    }
    async createSpot(createSpotDto, user) {
        const critterExists = await this.crittersRepository.findOne({
            where: { id: createSpotDto.critterId },
        });
        if (!critterExists) {
            throw new common_1.NotFoundException(`Critter with ID "${createSpotDto.critterId}" not found`);
        }
        const userExists = await this.usersRepository.findOne({
            where: { id: user.id },
        });
        if (!userExists) {
            throw new common_1.NotFoundException(`User with ID "${user.id}" not found`);
        }
        const purchases = await this.purchasesRepository.getPurchasesByUser(user.id);
        const ids = [];
        await Promise.all(purchases.map(async (p) => {
            ids.push(p.regionId);
        }));
        const founds = await this.crittersRegionsRepository.find({
            where: {
                regionId: (0, typeorm_2.In)(ids),
                critterId: createSpotDto.critterId,
            },
        });
        if (founds.length < 1) {
            throw new common_1.UnauthorizedException('The current user has not this critter in his/her purchased regions.');
        }
        createSpotDto.userId = user.id;
        return this.spotsRepository.createSpot(createSpotDto);
    }
};
SpotsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(critters_regions_repository_1.CrittersRegionsRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(critters_repository_1.CrittersRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(users_repository_1.UsersRepository)),
    __param(3, (0, typeorm_1.InjectRepository)(spots_repository_1.SpotsRepository)),
    __param(4, (0, typeorm_1.InjectRepository)(purchases_repository_1.PurchasesRepository)),
    __metadata("design:paramtypes", [critters_regions_repository_1.CrittersRegionsRepository,
        critters_repository_1.CrittersRepository,
        users_repository_1.UsersRepository,
        spots_repository_1.SpotsRepository,
        purchases_repository_1.PurchasesRepository])
], SpotsService);
exports.SpotsService = SpotsService;
//# sourceMappingURL=spots.service.js.map