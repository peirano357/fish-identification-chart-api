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
exports.PurchasesService = void 0;
const common_1 = require("@nestjs/common");
const purchases_repository_1 = require("./purchases.repository");
const typeorm_1 = require("@nestjs/typeorm");
const user_type_enum_1 = require("../auth/enum/user-type.enum");
const users_repository_1 = require("../auth/users.repository");
const regions_repository_1 = require("../regions/regions.repository");
const typeorm_2 = require("typeorm");
let PurchasesService = class PurchasesService {
    constructor(regionsRepository, usersRepository, purchasesRepository) {
        this.regionsRepository = regionsRepository;
        this.usersRepository = usersRepository;
        this.purchasesRepository = purchasesRepository;
    }
    async getPurchasesByUser(userId) {
        const purchases = await this.purchasesRepository.getPurchasesByUser(userId);
        const ids = [];
        await Promise.all(purchases.map(async (p) => {
            ids.push(p.regionId);
        }));
        return await this.regionsRepository.find({
            where: {
                id: (0, typeorm_2.In)(ids),
            },
        });
    }
    async getPurchaseByIds(userId, regionId) {
        const found = await this.purchasesRepository.findOne({
            where: { userId, regionId },
        });
        if (!found) {
            throw new common_1.NotFoundException(`Element with ID "${userId}" not found`);
        }
        return found;
    }
    async deletePurchase(regionId, userId, user) {
        if (user.userType == user_type_enum_1.UserTypeEnum.administrator) {
            const result = await this.purchasesRepository.delete({
                userId: userId,
                regionId: regionId,
            });
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Critter with ID "${userId}" not found for region with ID "${regionId}" `);
            }
        }
        else {
            throw new common_1.UnauthorizedException('Only administrators can perform this task.');
        }
    }
    async updatePurchase(id, userId, regionId, purchasedDate, user) {
        const purchase = await this.getPurchaseByIds(userId, regionId);
        purchase.purchasedDate = purchasedDate;
        if (user.userType == user_type_enum_1.UserTypeEnum.administrator) {
            const exists = this.purchasesRepository.findOne({
                where: {
                    userId: userId,
                    regionId: regionId,
                },
            });
            if (!exists) {
                throw new common_1.NotFoundException(`Element with IDs "${userId}" and "${regionId}" not found`);
            }
            await this.purchasesRepository.save(purchase);
            return purchase;
        }
        else {
            throw new common_1.UnauthorizedException('Only administrators can perform this task.');
        }
    }
    async createPurchase(createPurchaseDto, user) {
        if (user.userType == user_type_enum_1.UserTypeEnum.administrator) {
            const regionExists = await this.regionsRepository.findOne({
                where: { id: createPurchaseDto.regionId },
            });
            if (!regionExists) {
                throw new common_1.NotFoundException(`Region with ID "${createPurchaseDto.regionId}" not found`);
            }
            const userExists = await this.usersRepository.findOne({
                where: { id: createPurchaseDto.userId },
            });
            if (!userExists) {
                throw new common_1.NotFoundException(`User with ID "${createPurchaseDto.userId}" not found`);
            }
            return this.purchasesRepository.createPurchase(createPurchaseDto);
        }
        else {
            throw new common_1.UnauthorizedException('Only administrators can perform this task.');
        }
    }
};
PurchasesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(regions_repository_1.RegionsRepository)),
    __param(1, (0, typeorm_1.InjectRepository)(users_repository_1.UsersRepository)),
    __param(2, (0, typeorm_1.InjectRepository)(purchases_repository_1.PurchasesRepository)),
    __metadata("design:paramtypes", [regions_repository_1.RegionsRepository,
        users_repository_1.UsersRepository,
        purchases_repository_1.PurchasesRepository])
], PurchasesService);
exports.PurchasesService = PurchasesService;
//# sourceMappingURL=purchases.service.js.map