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
exports.RegionsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const create_region_dto_1 = require("./dto/create-region.dto");
const get_regions_filter_dto_1 = require("./dto/get-regions-filter.dto");
const update_region_dto_1 = require("./dto/update-region.dto");
const regions_service_1 = require("./regions.service");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
let RegionsController = class RegionsController {
    constructor(regionService, configService) {
        this.regionService = regionService;
        this.configService = configService;
        this.logger = new common_2.Logger('RegionsController');
    }
    createRegion(createRegionDto, user) {
        return this.regionService.createRegion(createRegionDto, user);
    }
    deleteRegion(id, user) {
        return this.regionService.deleteRegion(id, user);
    }
    updateRegion(id, updateRegionDto, user) {
        const { name, description, imageUrl } = updateRegionDto;
        return this.regionService.updateRegion(id, name, description, imageUrl, user);
    }
    getRegions(filterDto) {
        this.logger.verbose(`Retrieving all regions. Filters: ${JSON.stringify(filterDto)}`);
        return this.regionService.getRegions(filterDto);
    }
    getRegionById(id) {
        return this.regionService.getRegionById(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Creates a new diving region. (Requires administrator credentials)',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_region_dto_1.CreateRegionDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "createRegion", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Deletes an existent diving region from teh database. (Requires administrator credentials)',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "deleteRegion", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Updates an existent diving region. (Requires administrator credentials)',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_region_dto_1.UpdateRegionDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "updateRegion", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieves a list of all available diving regions',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_regions_filter_dto_1.GetRegionsFilterDto]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "getRegions", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieves a single diving region, by its ID (uuid)',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "getRegionById", null);
RegionsController = __decorate([
    (0, common_1.Controller)('regions'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiTags)('Regions'),
    __metadata("design:paramtypes", [regions_service_1.RegionsService,
        config_1.ConfigService])
], RegionsController);
exports.RegionsController = RegionsController;
//# sourceMappingURL=regions.controller.js.map