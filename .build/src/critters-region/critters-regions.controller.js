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
exports.CrittersRegionsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const critter_region_entity_1 = require("../critters-region/critter-region.entity");
const critters_regions_service_1 = require("../critters-region/critters-regions.service");
let CrittersRegionsController = class CrittersRegionsController {
    constructor(configService, critterRegionService) {
        this.configService = configService;
        this.critterRegionService = critterRegionService;
        this.logger = new common_2.Logger('CrittersRegionsController');
    }
    addCritter(id, critterRegion, user) {
        critterRegion.critterId = id;
        return this.critterRegionService.createCritterRegion(critterRegion, user);
    }
    removeCritter(id, critterRegion, user) {
        return this.critterRegionService.deleteCritterRegion(id, critterRegion.regionId, user);
    }
    getCrittersInRegion(regionId, user) {
        this.logger.verbose(`Retrieving all critters by region. Filters: ${JSON.stringify(regionId)}`);
        return this.critterRegionService.getCrittersInRegion(regionId);
    }
};
__decorate([
    (0, common_1.Post)('/:id/region'),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Adds a given critter to a given region chart. (Requires administrator credentials)',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        required: true,
        description: 'Critter Id (uuid) as appears in the database.',
    }),
    (0, swagger_1.ApiResponse)({
        type: critter_region_entity_1.CritterRegion,
        isArray: false,
        status: 201,
        description: 'Critter successfully added to region',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, critter_region_entity_1.CritterRegion,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CrittersRegionsController.prototype, "addCritter", null);
__decorate([
    (0, common_1.Delete)('/:id/region'),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Removes an existent critter from a given region. (Requires administrator credentials)',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        required: true,
        description: 'Critter Id (uuid) as appears in the database.',
    }),
    (0, swagger_1.ApiResponse)({ type: Number, isArray: false }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, critter_region_entity_1.CritterRegion,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CrittersRegionsController.prototype, "removeCritter", null);
__decorate([
    (0, common_1.Get)('/region/:regionId'),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieves a list of all available critters for a given region',
    }),
    __param(0, (0, common_1.Param)('regionId')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CrittersRegionsController.prototype, "getCrittersInRegion", null);
CrittersRegionsController = __decorate([
    (0, common_1.Controller)('critters'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiTags)('Critters'),
    __metadata("design:paramtypes", [config_1.ConfigService,
        critters_regions_service_1.CrittersRegionsService])
], CrittersRegionsController);
exports.CrittersRegionsController = CrittersRegionsController;
//# sourceMappingURL=critters-regions.controller.js.map