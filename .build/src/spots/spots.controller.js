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
exports.SpotsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const spot_entity_1 = require("../spots/spot.entity");
const spots_service_1 = require("../spots/spots.service");
let SpotsController = class SpotsController {
    constructor(configService, spotsService) {
        this.configService = configService;
        this.spotsService = spotsService;
        this.logger = new common_2.Logger('SpotsController');
    }
    addSpot(spot, user) {
        return this.spotsService.createSpot(spot, user);
    }
    removeSpot(spot, user) {
        return this.spotsService.deleteSpot(spot.critterId, user);
    }
    getSpotsForUser(user) {
        this.logger.verbose(`Retrieving all critters spotted by the current user.`);
        return this.spotsService.getSpotsByUser(user.id);
    }
};
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Marks a critter / fish as "spotted" for a given user',
    }),
    (0, swagger_1.ApiResponse)({
        type: spot_entity_1.Spot,
        isArray: false,
        status: 201,
        description: 'Critter / fish successfully saved as "spotted" for user.',
    }),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [spot_entity_1.Spot,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], SpotsController.prototype, "addSpot", null);
__decorate([
    (0, common_1.Delete)('/'),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Unmarks a critter / fish from the "Spotted List" for a given user.',
    }),
    (0, swagger_1.ApiResponse)({ type: Number, isArray: false }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [spot_entity_1.Spot, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], SpotsController.prototype, "removeSpot", null);
__decorate([
    (0, common_1.Get)('/me'),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieves a list of all spotted critters for the current user.',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], SpotsController.prototype, "getSpotsForUser", null);
SpotsController = __decorate([
    (0, common_1.Controller)('spots'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiTags)('Spots'),
    __metadata("design:paramtypes", [config_1.ConfigService,
        spots_service_1.SpotsService])
], SpotsController);
exports.SpotsController = SpotsController;
//# sourceMappingURL=spots.controller.js.map