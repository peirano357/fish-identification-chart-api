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
exports.CrittersService = void 0;
const common_1 = require("@nestjs/common");
const critters_repository_1 = require("./critters.repository");
const typeorm_1 = require("@nestjs/typeorm");
const user_type_enum_1 = require("../auth/enum/user-type.enum");
let CrittersService = class CrittersService {
    constructor(critterRepository) {
        this.critterRepository = critterRepository;
    }
    getCritters(filterDto) {
        return this.critterRepository.getCritters(filterDto);
    }
    async getCritterById(id) {
        const found = await this.critterRepository.findOne({ where: { id } });
        if (!found) {
            throw new common_1.NotFoundException(`Critter with ID "${id}" not found`);
        }
        return found;
    }
    async deleteCritter(id, user) {
        if (user.userType == user_type_enum_1.UserTypeEnum.administrator) {
            const result = await this.critterRepository.delete({ id });
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Critter with ID "${id}" not found`);
            }
        }
        else {
            throw new common_1.UnauthorizedException('Only administrators can perform this task.');
        }
    }
    async updateCritter(id, name, description, imageUrl, user) {
        const critter = await this.getCritterById(id);
        critter.name = name;
        critter.description = description;
        critter.imageUrl = imageUrl;
        if (user.userType == user_type_enum_1.UserTypeEnum.administrator) {
            await this.critterRepository.save(critter);
            return critter;
        }
        else {
            throw new common_1.UnauthorizedException('Only administrators can perform this task.');
        }
    }
    async createCritter(createCritterDto, user) {
        if (user.userType == user_type_enum_1.UserTypeEnum.administrator) {
            return await this.critterRepository.createCritter(createCritterDto);
        }
        else {
            throw new common_1.UnauthorizedException('Only administrators can perform this task.');
        }
    }
};
CrittersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(critters_repository_1.CrittersRepository)),
    __metadata("design:paramtypes", [critters_repository_1.CrittersRepository])
], CrittersService);
exports.CrittersService = CrittersService;
//# sourceMappingURL=critters.service.js.map