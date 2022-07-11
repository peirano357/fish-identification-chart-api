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
exports.CrittersController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const create_critter_dto_1 = require("./dto/create-critter.dto");
const get_critters_filter_dto_1 = require("./dto/get-critters-filter.dto");
const update_critter_dto_1 = require("./dto/update-critter.dto");
const critters_service_1 = require("./critters.service");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
let CrittersController = class CrittersController {
    constructor(critterService, configService) {
        this.critterService = critterService;
        this.configService = configService;
        this.logger = new common_2.Logger('CrittersController');
    }
    createCritter(createCritterDto, user) {
        return this.critterService.createCritter(createCritterDto, user);
    }
    deleteCritter(id, user) {
        return this.critterService.deleteCritter(id, user);
    }
    updateCritter(id, updateCritterDto, user) {
        const { name, description, imageUrl } = updateCritterDto;
        return this.critterService.updateCritter(id, name, description, imageUrl, user);
    }
    getCritters(filterDto, user) {
        this.logger.verbose(`Retrieving all critters. Filters: ${JSON.stringify(filterDto)}`);
        return this.critterService.getCritters(filterDto);
    }
    getCritterById(id, user) {
        return this.critterService.getCritterById(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Creates a new critter / fish in the database. (Requires administrator credentials)',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_critter_dto_1.CreateCritterDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CrittersController.prototype, "createCritter", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Deletes a critter / fish from the database. (Requires administrator credentials)',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CrittersController.prototype, "deleteCritter", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Updates an existent critter / fish. (Requires administrator credentials)',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_critter_dto_1.UpdateCritterDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CrittersController.prototype, "updateCritter", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieves a list of all available critters',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_critters_filter_dto_1.GetCritterFilterDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CrittersController.prototype, "getCritters", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieves an existent critter / fish from the database by its ID.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CrittersController.prototype, "getCritterById", null);
CrittersController = __decorate([
    (0, common_1.Controller)('critters'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiTags)('Critters'),
    __metadata("design:paramtypes", [critters_service_1.CrittersService,
        config_1.ConfigService])
], CrittersController);
exports.CrittersController = CrittersController;
//# sourceMappingURL=critters.controller.js.map